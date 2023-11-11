package fr.unice.politech.borneappetit.service;

import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import fr.unice.politech.borneappetit.repository.ClientOrderRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BillingService {
    @Value("${gateway_url}")
    String apiUrl;

    private ClientOrderRepository clientOrderRepository;

    private final OrderService orderService;
    private final TableService tableService;

    public BillingService(OrderService orderService, ClientOrderRepository clientOrderRepository, TableService tableService) {
        this.orderService = orderService;
        this.clientOrderRepository = clientOrderRepository;
        this.tableService = tableService;
    }

    public boolean isBillingStartForTable(Long tableId) {
        List<ClientOrderEntity> orders = this.clientOrderRepository.findNotBilledOrdersForTable(tableId);
        if (!orders.isEmpty()) {
            return orders.get(0).billingStarted;
        }
        return false;
    }

    public boolean startBillingStartForTable(Long tableId) {
        List<ClientOrderEntity> orders = this.clientOrderRepository.findNotBilledOrdersForTable(tableId);
        if (!isBillingStartForTable(tableId)) {
            for (ClientOrderEntity order : orders) {
                order.billingStarted = true;
            }
            this.clientOrderRepository.saveAll(orders);
            return true;
        }
        return false;
    }

    public double getBillingForClient(Long tableId, Long clientId) {
        for (ClientOrderEntity order : this.clientOrderRepository.findNotBilledOrdersForTable(tableId)) {
            if (Objects.equals(order.getClientId(), clientId)) {
                if (order.isBilled()) {
                    return 0;
                }
                return order.getPrice();
            }
        }
        return -1;
    }

    public double getRemainingBillForTable(Long tableId) {
        double cost = 0;
        for (ClientOrderEntity order : this.clientOrderRepository.findNotBilledOrdersForTable(tableId)) {
            if (!order.isBilled()) {
                cost += order.getPrice();
            }
        }
        return cost;
    }

    public List<ClientOrderEntity> payRemainingForTable(Long tableId) {
        List<ClientOrderEntity> orders = this.clientOrderRepository.findNotBilledOrdersForTable(tableId);
        for (ClientOrderEntity order : orders) {
            order.billed = true;
        }
        try {
            sendPostRequestBilling(tableId);
            clientOrderRepository.deleteOrdersByTableId(tableId);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return this.clientOrderRepository.saveAll(orders);
    }

    public ClientOrderEntity payForClient(Long tableId, Long clientId) {
        if (isEveryClientBilledExceptOne(tableId, clientId)){
            try {
                sendPostRequestBilling(tableId);
                clientOrderRepository.deleteOrdersByTableId(tableId);
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        }
        Optional<ClientOrderEntity> clientOrderEntity = this.clientOrderRepository.findNotBilledByTableIdAndClientId(tableId, clientId);
        if (clientOrderEntity.isPresent()) {
            ClientOrderEntity update = clientOrderEntity.get();
            update.billed = true;
            return this.clientOrderRepository.save(update);
        }
        return null;
    }

    public boolean isEveryClientBilledExceptOne(Long tableId,Long clientId) {
        for (ClientOrderEntity order : this.clientOrderRepository.findNotBilledOrdersForTable(tableId)) {
            if (!order.isBilled() && !order.getClientId().equals(clientId)) {
                return false;
            }
        }
        return true;
    }    

    public void sendPostRequestBilling(Long tableId) throws URISyntaxException{
        String url = apiUrl+"/dining/tableOrders/"+tableService.getTableOrderIdFromTableNumber(tableId)+"/bill";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        
        RequestEntity<?> requestEntity = new RequestEntity<>(headers, HttpMethod.POST, new URI(url));

        restTemplate.exchange(requestEntity, String.class);
    }
}

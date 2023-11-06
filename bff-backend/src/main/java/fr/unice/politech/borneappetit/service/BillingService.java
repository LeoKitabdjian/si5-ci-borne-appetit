package fr.unice.politech.borneappetit.service;

import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import fr.unice.politech.borneappetit.repository.ClientOrderRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BillingService {
    @Value("${gateway_url}")
    String apiUrl;

    private ClientOrderRepository clientOrderRepository;

    private final OrderService orderService;

    public BillingService(OrderService orderService, ClientOrderRepository clientOrderRepository) {
        this.orderService = orderService;
        this.clientOrderRepository = clientOrderRepository;
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
                return order.getCost();
            }
        }
        return -1;
    }

    public double getRemainingBillForTable(Long tableId) {
        double cost = 0;
        for (ClientOrderEntity order : this.clientOrderRepository.findNotBilledOrdersForTable(tableId)) {
            if (!order.isBilled()) {
                cost += order.getCost();
            }
        }
        return cost;
    }

    public List<ClientOrderEntity> payRemainingForTable(Long tableId) {
        List<ClientOrderEntity> orders = this.clientOrderRepository.findNotBilledOrdersForTable(tableId);
        for (ClientOrderEntity order : orders) {
            order.billed = true;
        }
        return this.clientOrderRepository.saveAll(orders);
    }

    public ClientOrderEntity payForClient(Long tableId, Long clientId) {
        Optional<ClientOrderEntity> clientOrderEntity = this.clientOrderRepository.findNotBilledByTableIdAndClientId(tableId, clientId);
        if (clientOrderEntity.isPresent()) {
            ClientOrderEntity update = clientOrderEntity.get();
            update.billed = true;
            return this.clientOrderRepository.save(update);
        }
        return null;
    }
}

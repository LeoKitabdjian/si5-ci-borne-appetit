package fr.unice.politech.borneappetit.service;

import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import fr.unice.politech.borneappetit.repository.ClientOrderRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Objects;

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
}

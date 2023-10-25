package fr.unice.politech.borneappetit.service;

import fr.unice.politech.borneappetit.dto.ClientOrderDto;
import fr.unice.politech.borneappetit.dto.MenuDto;
import fr.unice.politech.borneappetit.dto.OrderDto;
import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import fr.unice.politech.borneappetit.model.Table;
import fr.unice.politech.borneappetit.model.TableOrder;

import fr.unice.politech.borneappetit.repository.ClientOrderRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final TableService tableService;
    private final MenuService menuService;

    private final ClientOrderRepository clientOrderRepository;

    public OrderService(TableService tableService, MenuService menuService, ClientOrderRepository clientOrderRepository) {
        this.tableService = tableService;
        this.menuService = menuService;
        this.clientOrderRepository = clientOrderRepository;
    }

    public List create(OrderDto order) throws Exception {
        System.out.println("Recherche d'une table disponible");
        Optional<Table> table = tableService.findAvailableTable();
        if (table.isPresent()) {
            System.out.println("Reservation de la table dans le microservice via le gateway");
            TableOrder tableOrder = tableService.makeReservation(Math.toIntExact(table.get().getNumber()), Math.toIntExact(order.customer));
            String tableOrderId = String.valueOf(tableOrder.getId());

            Map<String, MenuDto> menusMap = Arrays.stream(this.menuService.getAll())
                    .collect(Collectors.toMap(MenuDto::getId, menu -> menu));
            System.out.println("Ajout des items à la table");
            for (Map.Entry<String, Integer> entry : order.items.entrySet()) {
                String menuId = entry.getKey();
                Integer howMany = entry.getValue();

                MenuDto menu = menusMap.get(menuId);
                tableService.addItemToTable(tableOrderId, menuId, menu.getShortName(), howMany);
            }

            // tableService.payForOrder(tableOrderId);
            System.out.println("Envoi de la commande pour préparation");
            tableService.sendOrderToPreparation(tableOrderId);
            System.out.println("Envoi de la réponse au client (id de la commande et numéro de table)");
            return List.of(table.get().getNumber(), tableOrderId);
        } else {
            throw new Exception("Aucune table disponible"); // todo: advice
        }
    }

    /**
     * Create the client order or update it if there is one and not ordered
     */
    public ClientOrderEntity addOrUpdateClientOrder(ClientOrderDto orderDto) {
        Optional<ClientOrderEntity> existingOrder = clientOrderRepository.findNotOrderedByTableIdAndClientId(orderDto.getTable(), orderDto.getClient());

        if (existingOrder.isPresent()) {
            ClientOrderEntity orderToUpdate = existingOrder.get();
            if (!orderToUpdate.isOrdered()) {
                orderToUpdate.setItems(orderDto.getItems());
                return clientOrderRepository.save(orderToUpdate);
            }
        }

        ClientOrderEntity newOrder = ClientOrderEntity.fromDto(orderDto);
        return clientOrderRepository.save(newOrder);
    }

    public Object getOrderForTable(Long tableId) {
        OrderDto orderDto = new OrderDto();

        List<ClientOrderEntity> unordered = this.clientOrderRepository.findNotOrderedOrdersForTable(tableId);

        Map response = new HashMap<>();

        response.put("customers", unordered.stream()
                .map(ClientOrderEntity::getClientId)
                .distinct()
                .count());
        response.put("items", unordered);

        return response;
    }

    public void markUnorderedOrdersAsOrdered(Long tableId) {
        List<ClientOrderEntity> unorderedOrders = clientOrderRepository.findNotOrderedOrdersForTable(tableId);

        for (ClientOrderEntity order : unorderedOrders) {
            order.setOrdered(true);
        }

        clientOrderRepository.saveAll(unorderedOrders);
    }
}

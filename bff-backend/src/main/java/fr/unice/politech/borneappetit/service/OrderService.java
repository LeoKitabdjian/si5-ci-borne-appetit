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
        Map<String, MenuDto> menusMap = Arrays.stream(this.menuService.getAll())
                .collect(Collectors.toMap(MenuDto::getId, menu -> menu));

        double cost = 0;
        for (Map.Entry<String, Integer> entry : orderDto.items.entrySet()) {
            String menuId = entry.getKey();
            Integer howMany = entry.getValue();

            MenuDto menu = menusMap.get(menuId);
            cost += menu.getPrice() * howMany;
        }

        if (existingOrder.isPresent()) {
            ClientOrderEntity orderToUpdate = existingOrder.get();
            if (!orderToUpdate.isOrdered()) {
                orderToUpdate.setItems(orderDto.getItems());
                orderToUpdate.setPrice(cost);
                return clientOrderRepository.save(orderToUpdate);
            }
        }

        ClientOrderEntity newOrder = ClientOrderEntity.fromDto(orderDto);
        newOrder.setPrice(cost);
        return clientOrderRepository.save(newOrder);
    }

    public Map<Long, Map<String, Object>> getOrderForTable(Long tableId) {
        
        List<ClientOrderEntity> unordered = this.clientOrderRepository.findNotOrderedOrdersForTable(tableId);
        System.out.println("Lecture des commandes non validées de la table " + tableId + " dans le BFF");
        Map<Long, Map<String, Object>> response = new HashMap<>();

        unordered.forEach(order -> {
            Map<String, Object> clientOrder = new HashMap<>();
            clientOrder.put("items", order.getItems());
            clientOrder.put("price", order.getPrice());

            response.put(order.getClientId(), clientOrder);
        });
        System.out.println("Retour des commandes non validées de la table " + tableId + " dans le BFF");
        return response;
    }

    /**
     * Send unordered to ordered
     */
    public Map sendOrder(Long tableId) throws Exception {
        System.out.println("Lecture des commandes non validées de la table " + tableId + " dans le BFF");
        List<ClientOrderEntity> unordered = this.clientOrderRepository.findNotOrderedOrdersForTable(tableId);
        System.out.println("Reservation de la table dans le microservice via le gateway");
        TableOrder tableOrder = tableService.makeReservation(Math.toIntExact(tableId), (int) unordered.stream()
                .map(ClientOrderEntity::getClientId)
                .distinct()
                .count());

        Map<String, MenuDto> menusMap = Arrays.stream(this.menuService.getAll())
                .collect(Collectors.toMap(MenuDto::getId, menu -> menu));
        System.out.println("Creation de la commande dans le BFF pour un envoi au microservice via le gateway avec la liste des commandes non validées");
        for (ClientOrderEntity o : unordered) {
            for (Map.Entry<String, Integer> entry : o.items.entrySet()) {
                String menuId = entry.getKey();
                Integer howMany = entry.getValue();

                MenuDto menu = menusMap.get(menuId);
                tableOrder = tableService.addItemToTable(tableOrder.getId(), menuId, menu.getShortName(), howMany);
            }
            o.setOrderUuid(tableOrder.getId());
            System.out.println("Ajout de id de la commande (MongoDB) dans la Base de Données du BFF");
            this.clientOrderRepository.save(o);
        }


        System.out.println("Envoi de la commande pour préparation");
        tableService.sendOrderToPreparation(tableOrder.getId());
        markUnorderedOrdersAsOrdered(tableId);

        System.out.println("Envoi de la réponse au client (id de la commande et numéro de table)");
        Map response = new HashMap();
        response.put("tableId", tableId);
        response.put("order", tableOrder);
        return response;
    }


    public void markUnorderedOrdersAsOrdered(Long tableId) {
        System.out.println("Changement de l'état des commandes non validées de la table " + tableId + " dans le BFF à un état validé");
        List<ClientOrderEntity> unorderedOrders = clientOrderRepository.findNotOrderedOrdersForTable(tableId);

        for (ClientOrderEntity order : unorderedOrders) {
            order.setOrdered(true);
        }

        clientOrderRepository.saveAll(unorderedOrders);
    }
}

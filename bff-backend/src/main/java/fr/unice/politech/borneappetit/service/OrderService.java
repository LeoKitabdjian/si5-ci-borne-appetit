package fr.unice.politech.borneappetit.service;

import fr.unice.politech.borneappetit.dto.MenuDto;
import fr.unice.politech.borneappetit.dto.OrderDto;
import fr.unice.politech.borneappetit.model.Table;
import fr.unice.politech.borneappetit.model.TableOrder;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final TableService tableService;
    private final MenuService menuService;
    private Map<String, OrderDto[]> orderlist;

    public OrderService(TableService tableService, MenuService menuService) {
        this.tableService = tableService;
        this.menuService = menuService;
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

    public void storeOrder(OrderDto order, String tableId){
        if (this.orderlist.containsKey(tableId)){
            OrderDto[] orders = this.orderlist.get(tableId);
            OrderDto[] newOrders = new OrderDto[orders.length + 1];
            for (int i = 0; i < orders.length; i++){
                newOrders[i] = orders[i];
            }
            newOrders[orders.length] = order;
            this.orderlist.put(tableId, newOrders);
        }
        else{
            orderlist.put(tableId, new OrderDto[]{order});
        }
    }

    private OrderDto mergeOrderDto(String tableId){
        OrderDto[] orders = this.orderlist.get(tableId);
        OrderDto order = new OrderDto();
        for (int i = 0; i < orders.length; i++){
            for (Map.Entry<String, Integer> entry : orders[i].items.entrySet()) {
                String menuId = entry.getKey();
                Integer howMany = entry.getValue();
                if (order.items.containsKey(menuId)){
                    order.items.put(menuId, order.items.get(menuId) + howMany);
                }
                else{
                    order.items.put(menuId, howMany);
                }
            }
        }
        return order;
    
    }

    public List createTableOrder(String tableID){
        OrderDto order = mergeOrderDto(tableID);
        Table table = tableService.findByID(tableID);
        TableOrder tableOrder = tableService.makeReservation(Math.toIntExact(table.getNumber()), Math.toIntExact(order.customer));
        String tableOrderId = String.valueOf(tableOrder.getId());
        Map<String, MenuDto> menusMap = Arrays.stream(this.menuService.getAll()).collect(Collectors.toMap(MenuDto::getId, menu -> menu));
        for (Map.Entry<String, Integer> entry : order.items.entrySet()) {
            String menuId = entry.getKey();
            Integer howMany = entry.getValue();
            MenuDto menu = menusMap.get(menuId);
            tableService.addItemToTable(tableOrderId, menuId, menu.getShortName(), howMany);
        }
        tableService.sendOrderToPreparation(tableOrderId);
        return List.of(table.getNumber(), tableOrderId);
    }
}

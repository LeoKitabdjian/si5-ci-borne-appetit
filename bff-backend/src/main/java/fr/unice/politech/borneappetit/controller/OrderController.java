package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.dto.ClientOrderDto;
import fr.unice.politech.borneappetit.dto.OrderDto;
import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import fr.unice.politech.borneappetit.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{tableId}")
    @Operation(summary = "Return a list of items of order of table (only the items for the order in progress) ")
    public Object getOrder(@PathVariable Long tableId) {
        System.out.println("Envoi des details de la commande le cours au client (request-reply)");
        return this.orderService.getOrderForTable(tableId);
    }

    @PostMapping
    @Operation(summary = "Make a received order directly. This is for combined orders of all clients")
    public List makeOrder(@RequestBody OrderDto orderDto) throws Exception {
        System.out.println("Réception de la commande");
        return orderService.create(orderDto);
    }

    @PostMapping("/{tableId}/{clientId}")
    @Operation(summary = "Save the items as order of a given client for a table")
    public ClientOrderEntity addClientOrder(@RequestBody Map<String, Integer> items, @PathVariable Long tableId, @PathVariable Long clientId) {
        System.out.println("Réception de la commande pour le client " + clientId + " de la table " + tableId);
        ClientOrderDto clientOrderDto = new ClientOrderDto();
        clientOrderDto.setClient(clientId);
        clientOrderDto.setTable(tableId);
        clientOrderDto.setItems(items);
        return this.orderService.addOrUpdateClientOrder(clientOrderDto);
    }

    @PostMapping("/send/{tableId}")
    @Operation(summary = "Send the order of the table to preparation")
    public void sendTableOrder(@PathVariable Long tableId) throws Exception {
        System.out.println("Envoi de la commande de la table " + tableId + " pour préparation");
        this.orderService.markUnorderedOrdersAsOrdered(tableId);
        // todo: send order for preparation and store the keys
    }
}

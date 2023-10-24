package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.dto.ClientOrderDto;
import fr.unice.politech.borneappetit.dto.OrderDto;
import fr.unice.politech.borneappetit.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @CrossOrigin
    @Operation(summary = "Make a received order directly. This is for combined orders of all clients")
    public List makeOrder(@RequestBody OrderDto orderDto) throws Exception {
        System.out.println("Réception de la commande");
        return orderService.create(orderDto);
    }

    @PostMapping("/{tableId}/{clientId}")
    @Operation(summary = "Save a order of a given client for a table")
    public void addClientOrder(@RequestBody ClientOrderDto orderDto, @PathVariable String tableId, @PathVariable String clientId) {
        System.out.println("Réception de la commande pour le client " + clientId + " de la table " + tableId);
        // todo: implementation of client order logic
    }

    @PostMapping("/send/{tableId}")
    @CrossOrigin
    @Operation(summary = "Send the order of the table to preparation")
    public void sendTableOrder(@PathVariable String tableId) throws Exception {
        System.out.println("Envoi de la commande de la table " + tableId + " pour préparation");
        // todo: return orderService.createTableOrder(tableId);
    }
}

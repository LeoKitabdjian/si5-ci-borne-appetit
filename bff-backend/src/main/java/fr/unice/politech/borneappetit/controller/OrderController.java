package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.dto.ClientOrderDto;
import fr.unice.politech.borneappetit.dto.OrderDto;
import fr.unice.politech.borneappetit.service.OrderService;
import fr.unice.politech.borneappetit.service.TableService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
    private final OrderService orderService;
    private final TableService tableService;

    public OrderController(OrderService orderService, TableService tableService) {
        this.orderService = orderService;
        this.tableService = tableService;
    }

    @GetMapping("/{tableId}")
    @Operation(summary = "Return a list of items of order of table (only the items for the order in progress that is unordered) ")
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
    public ResponseEntity addClientOrder(@RequestBody Map<String, Integer> items, @PathVariable Long tableId, @PathVariable @Min(1) @Max(4) Long clientId) {
        System.out.println("Réception de la commande pour le client " + clientId + " de la table " + tableId);
        if (!this.tableService.isAvailable(tableId)) {
            return ResponseEntity.status(409).body("La table est deja prise");
        }

        ClientOrderDto clientOrderDto = new ClientOrderDto();
        clientOrderDto.setClient(clientId);
        clientOrderDto.setTable(tableId);
        clientOrderDto.setItems(items);
        return ResponseEntity.ok(this.orderService.addOrUpdateClientOrder(clientOrderDto));
    }

    @PostMapping("/send/{tableId}")
    @Operation(summary = "Send the order of the table to preparation")
    public ResponseEntity sendTableOrder(@PathVariable Long tableId) throws Exception {
        System.out.println("Envoi de la commande de la table " + tableId + " pour préparation");
        if (!this.tableService.isAvailable(tableId)) {
            return ResponseEntity.status(409).body("La table est deja prise");
        }
        return ResponseEntity.ok(this.orderService.sendOrder(tableId));
    }
}

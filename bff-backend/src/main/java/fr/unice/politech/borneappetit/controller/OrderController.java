package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.dto.OrderDto;
import fr.unice.politech.borneappetit.service.OrderService;
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
    public List makeOrder(@RequestBody OrderDto orderDto) throws Exception {
        System.out.println("Réception de la commande");
        return orderService.create(orderDto);
    }

    @GetMapping("/:id")
    @CrossOrigin
    public void storeTableOrder(@RequestBody OrderDto orderDto,@RequestBody String tableId) throws Exception {
        System.out.println("Ajout de la commande");
        orderService.storeOrder(orderDto,tableId);
    }
    @GetMapping("/send/:id")
    @CrossOrigin
    public void sendTableOrder(@RequestBody String tableId) throws Exception {
        System.out.println("Envoi de la commande");
        orderService.createTableOrder(tableId);
    }
}

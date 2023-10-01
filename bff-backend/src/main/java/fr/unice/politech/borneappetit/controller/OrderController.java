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
        return orderService.create(orderDto);
    }
}

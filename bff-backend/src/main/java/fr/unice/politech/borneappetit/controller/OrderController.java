package fr.unice.politech.borneappetit.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("orders")
public class OrderController {
    @PostMapping
    public void makeOrder() {
        // todo: find available table (return error if not)
        // todo: make the table as taken
        // todo: link the orders items with the table
        // todo: make order as payed
        // todo: send the items to be cooked
        // todo: return the command id and the table id
    }
}

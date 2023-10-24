package fr.unice.politech.borneappetit.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("billings")
@CrossOrigin
public class BillingController {
    @GetMapping("/{tableId}")
    @Operation(summary ="Get the remaining table addition")
    public void tableAddition(){

    }

    @GetMapping("/{tableId}/{clientId}")
    @Operation(summary ="Get the addition for a specific client")
    public void clientAddition(){

    }
    @PostMapping("/{tableId}")
    @Operation(summary ="Pay all unpaid order for the table")
    public void payTable(){

    }

    @PostMapping("/{tableId}/{clientId}")
    @Operation(summary ="Pay for the client")
    public void payForClient(){

    }
}

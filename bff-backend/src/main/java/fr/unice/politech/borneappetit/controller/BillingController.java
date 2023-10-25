package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.service.BillingService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("billings")
@CrossOrigin
public class BillingController {
    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping("/{tableId}")
    @Operation(summary ="Get the remaining table addition")
    public double tableAddition(Long tableId){
        return this.billingService.getRemainingBillForTable(tableId);
    }

    @GetMapping("/{tableId}/{clientId}")
    @Operation(summary ="Get the addition for a specific client")
    public double clientAddition(Long tableId, Long clientId){
        return this.billingService.getBillingForClient(tableId, clientId);
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

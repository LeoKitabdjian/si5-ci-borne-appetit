package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import fr.unice.politech.borneappetit.service.BillingService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public double tableAddition(@PathVariable Long tableId){
        return this.billingService.getRemainingBillForTable(tableId);
    }

    @GetMapping("/{tableId}/{clientId}")
    @Operation(summary ="Get the addition for a specific client")
    public double clientAddition(@PathVariable Long tableId, @PathVariable Long clientId){
        return this.billingService.getBillingForClient(tableId, clientId);
    }

    @PostMapping("/{tableId}")
    @Operation(summary ="Pay all unpaid order for the table")
    public List<ClientOrderEntity> payTable(@PathVariable Long tableId){
        // todo: payment in the microservices
        System.out.println("todo: payment in the microservices");
        return this.billingService.payRemainingForTable(tableId);
    }

    @PostMapping("/{tableId}/{clientId}")
    @Operation(summary ="Pay for the client")
    public ClientOrderEntity payForClient(@PathVariable Long tableId, @PathVariable Long clientId){
        return this.billingService.payForClient(tableId, clientId);
    }
}

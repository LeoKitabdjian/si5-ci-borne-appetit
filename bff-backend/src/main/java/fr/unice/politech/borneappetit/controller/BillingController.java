package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import fr.unice.politech.borneappetit.service.BillingService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{tableId}/start")
    @Operation(summary ="Check if the billing start for the table")
    public boolean isBillingStartForTable(@PathVariable Long tableId){
        return this.billingService.isBillingStartForTable(tableId);
    }

    @PostMapping("/{tableId}/start")
    @Operation(summary ="Mark the billing for the given table as started")
    public boolean startBillingStartForTable(@PathVariable Long tableId){
        return this.billingService.startBillingStartForTable(tableId);
    }

    @GetMapping("/{tableId}/{clientId}")
    @Operation(summary ="Get the addition for a specific client")
    public double clientAddition(@PathVariable Long tableId, @PathVariable Long clientId){
        return this.billingService.getBillingForClient(tableId, clientId);
    }

    @PostMapping("/{tableId}")
    @Operation(summary ="Pay all unpaid order for the table")
    public ResponseEntity payTable(@PathVariable Long tableId){
        if (this.billingService.isBillingStartForTable(tableId)) {
            return ResponseEntity.ok(this.billingService.payRemainingForTable(tableId));
        } else {
            return ResponseEntity.status(409).body("Impossible to bill for a table for which billing has not yet begun");
        }
    }

    @PostMapping("/{tableId}/{clientId}")
    @Operation(summary ="Pay for the client")
    public ResponseEntity payForClient(@PathVariable Long tableId, @PathVariable Long clientId){
        if (this.billingService.isBillingStartForTable(tableId)) {
            return ResponseEntity.ok(this.billingService.payForClient(tableId, clientId));
        } else {
            return ResponseEntity.status(409).body("Impossible to bill for a client for which billing has not yet begun for his table");
        }
    }
}

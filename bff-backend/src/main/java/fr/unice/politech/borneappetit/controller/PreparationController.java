package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.model.Preparation;
import fr.unice.politech.borneappetit.service.PreparationService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/preparations")
public class PreparationController {
    private final PreparationService preparationService;

    public PreparationController(PreparationService preparationService) {
        this.preparationService = preparationService;
    }

    @GetMapping("{tableId}")
    @Operation(summary = "Get the list of preparations for a table")
    public Map<String, Preparation[]> get(@PathVariable Long tableId){
        return this.preparationService.getAll(tableId);
    }
}

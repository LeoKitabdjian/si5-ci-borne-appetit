package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.model.Preparation;
import fr.unice.politech.borneappetit.service.PreparationService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/preparations")
@CrossOrigin
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

    @GetMapping("{tableId}/grouped")
    @Operation(summary = "Get the list of preparations for a table")
    public Map<String, List<Map<String, Long>>> getGrouped(@PathVariable Long tableId){
        return this.preparationService.getAllGrouped(tableId);
    }
}

package fr.unice.politech.borneappetit.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/preparations")
public class PreparationController {
    @GetMapping("{tableId}")
    @Operation(summary = "Get the list of preparation for a table")
    public void get(){

    }
}

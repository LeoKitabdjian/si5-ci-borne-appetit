package fr.unice.politech.borneappetit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class CategoryMenuDto {
    private String name;
    private Map<String, ItemDto> items;
}

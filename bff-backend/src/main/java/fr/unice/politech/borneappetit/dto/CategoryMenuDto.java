package fr.unice.politech.borneappetit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CategoryMenuDto {
    private String id;
    private List<ItemDto> items;
}

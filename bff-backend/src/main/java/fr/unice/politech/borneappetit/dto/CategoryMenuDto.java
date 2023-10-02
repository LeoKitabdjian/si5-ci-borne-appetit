package fr.unice.politech.borneappetit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class CategoryMenuDto {
    @JsonProperty("id")
    private String name;
    private Map<String, ItemDto> items;
}

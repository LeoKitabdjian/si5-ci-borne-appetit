package fr.unice.politech.borneappetit.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

import java.util.Map;

@Data
public class OrderDto {
    @JsonAlias({"customers"})
    public Long customer;
    public Map<String, Integer> items;
}

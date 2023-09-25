package fr.unice.politech.borneappetit.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class MenuDto {
    @JsonAlias({"_id"})
    private String id;
    private String fullName;
    private String shortName;
    private double price;
    private String category;
    private String image;
}

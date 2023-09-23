package fr.unice.politech.borneappetit.dto;

import lombok.Data;

@Data
public class MenuDto {
    private String id;
    private String fullName;
    private String shortName;
    private Long price;
    private String category;
    private String image;
}

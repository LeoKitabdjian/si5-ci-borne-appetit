package fr.unice.politech.borneappetit.model;

import lombok.Data;

@Data
public class OrderingItem {
    private String id;
    private String shortName;
    private String category;
}

package fr.unice.politech.borneappetit.model;

import lombok.Data;

@Data
public class OrderingLine {
    private OrderingItem item;
    private int howMany;
    private boolean sentForPreparation;
}

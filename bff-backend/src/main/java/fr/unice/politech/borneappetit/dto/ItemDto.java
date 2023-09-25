package fr.unice.politech.borneappetit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ItemDto {
    private String id;
    private String name;
    private double price;
    private String image;

    public static ItemDto fromMenuDto(MenuDto menu) {
        return new ItemDto(menu.getId(), menu.getFullName(), menu.getPrice(), menu.getImage());
    }
}

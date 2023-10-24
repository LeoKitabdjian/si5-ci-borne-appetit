package fr.unice.politech.borneappetit.dto;

import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientOrderDto {
    public Long client;
    public Long table;
    public Map<String, Integer> items;

    /**
     * Create a client order dto from client order entity
     */
    public static ClientOrderDto fromEntity(ClientOrderEntity order) {
        return new ClientOrderDto(
                order.getClientId(),
                order.getTableId(),
                order.getItems()
        );
    }
}

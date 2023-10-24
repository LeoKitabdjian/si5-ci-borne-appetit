package fr.unice.politech.borneappetit.model;

import fr.unice.politech.borneappetit.dto.ClientOrderDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Map;

@Data
@Entity(name = "client_orders")
public class ClientOrderEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public Long clientId;
    public Long tableId;

    @ElementCollection
    @MapKeyColumn(name="item_real_id")
    @Column(name="howMany")
    @CollectionTable(name="items", joinColumns=@JoinColumn(name="item_id"))
    public Map<String, Integer> items;
    public boolean ordered = false;

    public static ClientOrderEntity fromDto(ClientOrderDto orderDto) {
        ClientOrderEntity o = new ClientOrderEntity();
        o.setClientId(orderDto.getClient());
        o.setOrdered(false);
        o.setItems(orderDto.getItems());
        o.setTableId(orderDto.getTable());
        return o;
    }
}
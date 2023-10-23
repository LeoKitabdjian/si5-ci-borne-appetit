package fr.unice.politech.borneappetit.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import javax.persistence.Table;

@Entity
@Table(name = "table_order")
@Data
public class TableOrderPostgre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive
    private Long tableNumber;

    @Positive
    private int customersCount;

    @NotNull
    private LocalDateTime opened;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "table_order_id")
    private List<OrderingLine> lines;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "table_order_id")
    private List<Preparation> preparations;

    private LocalDateTime billed;
}
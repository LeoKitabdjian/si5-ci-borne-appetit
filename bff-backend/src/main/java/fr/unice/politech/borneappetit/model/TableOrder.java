package fr.unice.politech.borneappetit.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class TableOrder {
    @JsonAlias({"_id"})
    private String id;
    @Positive
    private Long tableNumber;
    @Positive
    private int customersCount;
    @NotNull
    private LocalDateTime opened;
    private List<OrderingLine> lines;
    private List<Preparation> preparations;
    private LocalDateTime billed;
}

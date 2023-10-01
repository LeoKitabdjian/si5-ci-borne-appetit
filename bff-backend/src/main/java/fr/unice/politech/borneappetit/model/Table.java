package fr.unice.politech.borneappetit.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

import java.util.Optional;

@Data
public class Table {
    @JsonAlias({"_id"})
    private String id;
    private Long number;
    private boolean taken;
    private Optional<String> tableOrderId;
}

package fr.unice.politech.borneappetit.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

import java.util.UUID;

@Data
public class CookedItem {
    @JsonAlias({"_id"})
    private String id;
    private String shortName;
}

package fr.unice.politech.borneappetit.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class Preparation {
    @JsonAlias({"_id"})
    private String id;
    // @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime shouldBeReadyAt;
    private List<CookedItem> preparedItems;

    public static List<CookedItem> getPreparedItems(InputStream inputStream) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            TypeReference<List<CookedItem>> typeReference = new TypeReference<>() {};
            return objectMapper.readValue(inputStream, typeReference);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}

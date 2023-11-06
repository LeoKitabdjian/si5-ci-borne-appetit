package fr.unice.politech.borneappetit.service;

import fr.unice.politech.borneappetit.dto.MenuDto;
import fr.unice.politech.borneappetit.model.Preparation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PreparationService {
    @Value("${gateway_url}")
    String apiUrl;

    /**
     * Get the preparation for the given table number
     * @param state can be readyToBeServed or preparationStarted
     */
    public Preparation[] get(Long tableNumber, String state) {
        if (!"readyToBeServed".equals(state) && !"preparationStarted".equals(state)) {
            throw new IllegalArgumentException("Invalid state. Accepted values are 'readyToBeServed' or 'preparationStarted'");
        }

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Preparation[]> responseEntity = restTemplate
                .getForEntity(apiUrl + "/kitchen/preparations?tableNumber={tableNumber}&state={state}", Preparation[].class, tableNumber, state);
        return responseEntity.getBody();
    }

    /**
     * Get all preparation for the table. This map is indexed by
     * the state key:
     *  - ready for the state readyToBeServed
     *  - started for the state preparationStarted
     */
    public Map<String, Preparation[]> getAll(Long tableNumber) {
        Map<String, Preparation[]> preparations = new HashMap<>();
        preparations.put("ready", get(tableNumber, "readyToBeServed"));
        preparations.put("started", get(tableNumber, "preparationStarted"));
        return preparations;
    }
}
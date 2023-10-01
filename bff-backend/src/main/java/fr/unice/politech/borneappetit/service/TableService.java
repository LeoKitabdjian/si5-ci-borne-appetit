package fr.unice.politech.borneappetit.service;

import fr.unice.politech.borneappetit.model.Preparation;
import fr.unice.politech.borneappetit.model.Table;
import fr.unice.politech.borneappetit.model.TableOrder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class TableService {
    @Value("${gateway_url}")
    String apiUrl;

    public Table[] getAll() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Table[]> responseEntity = restTemplate.getForEntity(apiUrl + "/dining/tables", Table[].class);
        return responseEntity.getBody();
    }

    public Optional<Table> findAvailableTable() {
        Table[] tables = getAll();
        for (Table table : tables) {
            if (!table.isTaken()) {
                return Optional.of(table);
            }
        }
        return Optional.empty();
    }

    public TableOrder makeReservation(Integer tableNumber, Integer customersCount) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Integer> data = new HashMap<>();
        data.put("tableNumber", tableNumber);
        data.put("customersCount", customersCount);

        HttpEntity<Map<String, Integer>> requestEntity = new HttpEntity<>(data, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TableOrder> responseEntity = restTemplate.postForEntity(apiUrl + "/dining/tableOrders", requestEntity, TableOrder.class);
        return responseEntity.getBody();
    }

    public TableOrder addItemToTable(String tableId, String menuId, String shortName, Integer howMany) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> data = new HashMap<>();
        data.put("menuItemId", menuId);
        data.put("menuItemShortName", shortName);
        data.put("howMany", howMany);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(data, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TableOrder> responseEntity = restTemplate.postForEntity(apiUrl + "/dining/tableOrders/" + tableId, requestEntity, TableOrder.class);
        return responseEntity.getBody();
    }

    public Object sendOrderToPreparation(String tableId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> responseEntity = restTemplate.postForEntity(apiUrl + "/dining/tableOrders/" + tableId + "/prepare", new HttpEntity<>(null, headers), Object.class);
        return responseEntity.getBody();
    }

    public TableOrder payForOrder(String tableId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TableOrder> responseEntity = restTemplate.postForEntity(apiUrl + "/dining/tableOrders/" + tableId + "/bill", new HttpEntity<>(null, headers), TableOrder.class);
        return responseEntity.getBody();
    }
}

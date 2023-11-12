package fr.unice.politech.borneappetit.service;

import fr.unice.politech.borneappetit.dto.MenuDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuService {
    @Value("${gateway_url}")
    String apiUrl;

    public MenuDto[] getAll() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<MenuDto[]> responseEntity = restTemplate.getForEntity(apiUrl + "/menu/menus", MenuDto[].class);
        return responseEntity.getBody();
    }

    public List<MenuDto> sortMenus(MenuDto[] menus, String sortBy, String sortOrder) {
        Comparator<MenuDto> menuComparator = getComparator(sortBy);

        if ("desc".equalsIgnoreCase(sortOrder)) {
            menuComparator = menuComparator.reversed();
        }

        return Arrays.stream(menus)
                .sorted(menuComparator)
                .collect(Collectors.toList());
    }

    private Comparator<MenuDto> getComparator(String sortBy) {
        return switch (sortBy) {
            case "id" -> Comparator.comparing(MenuDto::getId);
            case "shortName" -> Comparator.comparing(MenuDto::getShortName);
            case "price" -> Comparator.comparing(MenuDto::getPrice);
            case "category" -> Comparator.comparing(MenuDto::getCategory);
            case "image" -> Comparator.comparing(MenuDto::getImage);
            default -> Comparator.comparing(MenuDto::getFullName); // sort by fullName by default
        };
    }

    public String getIdWithShortName(String shortName) {
        MenuDto[] menus = getAll();
        for (MenuDto menu : menus) {
            if (menu.getShortName().equals(shortName)) {
                return menu.getId();
            }
        }
        return null;
    }
}

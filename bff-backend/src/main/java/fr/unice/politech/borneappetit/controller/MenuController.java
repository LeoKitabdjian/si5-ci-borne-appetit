package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.dto.MenuDto;
import fr.unice.politech.borneappetit.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@Tag(name = "Menu controller", description = "Operations related to menus")
public class MenuController {
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/menus")
    @Operation(summary = "Get a list of menus sorted by specified criteria.")
    public List<MenuDto> getSortedMenus(
            @Parameter(description = "Sort by field (id, fullName, shortName, price, category, image)")
            @RequestParam(defaultValue = "fullName") String sortBy,
            @Parameter(description = "Sort order (asc or desc)")
            @RequestParam(defaultValue = "asc") String sortOrder) {

        String apiUrl = "http://localhost:9500/menu/menus";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<MenuDto[]> responseEntity = restTemplate.getForEntity(apiUrl, MenuDto[].class);
        MenuDto[] menus = responseEntity.getBody();

        return menuService.sortMenus(menus, sortBy, sortOrder);
    }
}
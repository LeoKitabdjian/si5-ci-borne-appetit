package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.dto.CategoryMenuDto;
import fr.unice.politech.borneappetit.dto.ItemDto;
import fr.unice.politech.borneappetit.dto.MenuDto;
import fr.unice.politech.borneappetit.service.MenuService;
import fr.unice.politech.borneappetit.service.TableService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@Tag(name = "Menu controller", description = "Operations related to menus")
@RequestMapping("/menus")
public class MenuController {
    private final TableService tableService;
    private final MenuService menuService;

    public MenuController(MenuService menuService, TableService tableService) {
        this.menuService = menuService;
        this.tableService = tableService;
    }

    @GetMapping
    @Operation(summary = "Get a list of menus")
    public ResponseEntity getMenus() {
        System.out.println("Reception de la demande du menu et items");
        if (tableService.findAvailableTable().isPresent()) {
            System.out.println("Table disponible >= 1. Demande du menu au microservice via le gateway");
            List<MenuDto> menus = List.of(menuService.getAll());
            Map<String, Object> response = new HashMap<>();
            response.put("items", Arrays.stream(this.menuService.getAll())
                    .collect(Collectors.toMap(MenuDto::getId, ItemDto::fromMenuDto)));

            Map<String, List<MenuDto>> menusByCategory = menus.stream().collect(Collectors.groupingBy(MenuDto::getCategory));

            List<CategoryMenuDto> categoryMenus = new ArrayList<>();
            List<String> categories = List.of("STARTER", "MAIN", "BEVERAGE", "DESSERT");

            categories.forEach((category) -> {
                Map<String, ItemDto> itemsMap = menus.stream()
                        .filter(menu -> category.equals(menu.getCategory()))
                        .map(ItemDto::fromMenuDto)
                        .sorted(Comparator.comparing(ItemDto::getName))
                        .collect(Collectors.toMap(
                                ItemDto::getId,
                                itemDto -> itemDto
                        ));

                categoryMenus.add(new CategoryMenuDto(category, itemsMap));
            });

            response.put("categoryMenu", categoryMenus);
            System.out.println("Envoi de la réponse (le menu et les items)");
            return ResponseEntity.status(HttpStatus.OK)
                    .body(response);
        } else {
            System.out.println("Aucune table trouvée. Envoi d'une erreur en réponse");
            return ResponseEntity.status(HttpStatus.MULTI_STATUS).build();
        }
    }

    @GetMapping("/sorted")
    @Operation(summary = "Get a list of menus sorted by specified criteria.")
    public ResponseEntity<List<MenuDto>> getSortedMenus(
            @Parameter(description = "Sort by field (id, fullName, shortName, price, category, image)")
            @RequestParam(defaultValue = "fullName") String sortBy,
            @Parameter(description = "Sort order (asc or desc)")
            @RequestParam(defaultValue = "asc") String sortOrder) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(menuService.sortMenus(menuService.getAll(), sortBy, sortOrder));
    }
}

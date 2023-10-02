package fr.unice.politech.borneappetit.controller;

import fr.unice.politech.borneappetit.dto.CategoryMenuDto;
import fr.unice.politech.borneappetit.dto.ItemDto;
import fr.unice.politech.borneappetit.dto.MenuDto;
import fr.unice.politech.borneappetit.service.MenuService;
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
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    @Operation(summary = "Get a list of menus")
    public ResponseEntity<Map<String, Object>> getMenus() {
        List<MenuDto> menus = List.of(menuService.getAll());
        Map<String, Object> response = new HashMap<>();
        response.put("menu", menus);
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

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
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

    // @GetMapping("byCategory")
    // @Operation(summary = "Get the list of the menus grouped by category")
    public ResponseEntity<List<CategoryMenuDto>> getMenusByCategory() {
        List<MenuDto> menus = menuService.sortMenus(menuService.getAll(), "fullName", "asc");

        Map<String, List<MenuDto>> menusByCategory = menus.stream()
                .collect(Collectors.groupingBy(MenuDto::getCategory));

        List<CategoryMenuDto> categoryMenus = new ArrayList<>();
        menusByCategory.forEach((category, menuList) -> {
            Map<String, ItemDto> itemsMap = menuList.stream()
                    .map(ItemDto::fromMenuDto)
                    .sorted(Comparator.comparing(ItemDto::getName))
                    .collect(Collectors.toMap(
                            ItemDto::getId,   // Clé : id de l'ItemDto
                            itemDto -> itemDto // Valeur : ItemDto lui-même
                    ));

            categoryMenus.add(new CategoryMenuDto(category, itemsMap));
        });

        return ResponseEntity.status(HttpStatus.OK).body(categoryMenus);
    }
}

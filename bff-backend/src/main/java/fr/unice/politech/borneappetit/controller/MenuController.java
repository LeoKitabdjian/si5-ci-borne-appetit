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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Tag(name = "Menu controller", description = "Operations related to menus")
@RequestMapping("/menus")
public class MenuController {
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    @Operation(summary = "Get a list of menus sorted by specified criteria.")
    public ResponseEntity<List<MenuDto>> getSortedMenus(
            @Parameter(description = "Sort by field (id, fullName, shortName, price, category, image)")
            @RequestParam(defaultValue = "fullName") String sortBy,
            @Parameter(description = "Sort order (asc or desc)")
            @RequestParam(defaultValue = "asc") String sortOrder) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(menuService.sortMenus(menuService.getAll(), sortBy, sortOrder));
    }

    @GetMapping("byCategory")
    @Operation(summary = "Get the list of the menus grouped by category")
    public ResponseEntity<List<CategoryMenuDto>> getMenusByCategory() {
        List<MenuDto> menus = menuService.sortMenus(menuService.getAll(), "fullName", "asc");

        Map<String, List<MenuDto>> menusByCategory = menus.stream()
                .collect(Collectors.groupingBy(MenuDto::getCategory));

        List<CategoryMenuDto> categoryMenus = new ArrayList<>();
        menusByCategory.forEach((category, menuList) -> {
            List<ItemDto> items = menuList.stream()
                    .map(ItemDto::fromMenuDto)
                    .sorted(Comparator.comparing(ItemDto::getName))
                    .collect(Collectors.toList());

            categoryMenus.add(new CategoryMenuDto(category, items));
        });

        return ResponseEntity.status(HttpStatus.OK).body(categoryMenus);
    }
}

package com.clothify.controller;

import com.clothify.dto.ApiResponse;
import com.clothify.dto.CategoryDTO;
import com.clothify.dto.ProductDTO;
import com.clothify.service.CategoryService;
import com.clothify.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@Tag(name = "Categories", description = "Category management APIs")
public class CategoryController {

    private final CategoryService categoryService;
    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Get all categories")
    public ResponseEntity<ApiResponse<List<CategoryDTO>>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @GetMapping("/{identifier}")
    @Operation(summary = "Get category by ID or slug")
    public ResponseEntity<ApiResponse<CategoryDTO>> getCategory(@PathVariable String identifier) {
        CategoryDTO category;
        try {
            Long id = Long.valueOf(identifier);
            category = categoryService.getCategoryById(id);
        } catch (NumberFormatException e) {
            category = categoryService.getCategoryBySlug(identifier);
        }
        return ResponseEntity.ok(ApiResponse.success(category));
    }

    @GetMapping("/{categoryId}/products")
    @Operation(summary = "Get products in category")
    public ResponseEntity<ApiResponse<Page<ProductDTO>>> getCategoryProducts(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<ProductDTO> products = productService.getProductsByCategory(categoryId, page, size);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
}

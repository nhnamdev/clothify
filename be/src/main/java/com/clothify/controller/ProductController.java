package com.clothify.controller;

import com.clothify.dto.ApiResponse;
import com.clothify.dto.ProductDTO;
import com.clothify.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product management APIs")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Get all products with pagination")
    public ResponseEntity<ApiResponse<Page<ProductDTO>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy) {
        Page<ProductDTO> products = productService.getAllProducts(page, size, sortBy);
        return ResponseEntity.ok(ApiResponse.success(products));
    }

    @GetMapping("/{identifier}")
    @Operation(summary = "Get product by ID or slug")
    public ResponseEntity<ApiResponse<ProductDTO>> getProduct(@PathVariable String identifier) {
        ProductDTO product;
        try {
            UUID id = UUID.fromString(identifier);
            product = productService.getProductById(id);
        } catch (IllegalArgumentException e) {
            product = productService.getProductBySlug(identifier);
        }
        return ResponseEntity.ok(ApiResponse.success(product));
    }

    @GetMapping("/filter")
    @Operation(summary = "Filter products", description = "Filter by category, price range, or special flags. Use query params: categoryId, minPrice, maxPrice, filter (new/featured/top-rated), search")
    public ResponseEntity<ApiResponse<Page<ProductDTO>>> filterProducts(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String filter,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy) {

        Page<ProductDTO> products;

        if (search != null && !search.isEmpty()) {
            products = productService.searchProducts(search, page, size);
        } else if (minPrice != null && maxPrice != null) {
            products = productService.getProductsByPriceRange(minPrice, maxPrice, page, size);
        } else if (categoryId != null) {
            products = productService.getProductsByCategory(categoryId, page, size);
        } else if ("new".equals(filter)) {
            List<ProductDTO> newProducts = productService.getNewProducts();
            products = new PageImpl<>(newProducts.stream().skip(page * size).limit(size).toList());
        } else if ("featured".equals(filter)) {
            List<ProductDTO> featuredProducts = productService.getFeaturedProducts();
            products = new PageImpl<>(featuredProducts.stream().skip(page * size).limit(size).toList());
        } else if ("top-rated".equals(filter)) {
            products = productService.getTopRatedProducts(page, size);
        } else {
            products = productService.getAllProducts(page, size, sortBy);
        }

        return ResponseEntity.ok(ApiResponse.success(products));
    }
}

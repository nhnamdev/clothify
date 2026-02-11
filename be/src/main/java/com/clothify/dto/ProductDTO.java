package com.clothify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;
    private String name;
    private String slug;
    private String description;
    private CategoryDTO category;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private BigDecimal discountPercent;
    private String sku;
    private Integer stockQuantity;
    private BigDecimal rating;
    private Integer reviewCount;
    private Boolean isNew;
    private Boolean isFeatured;
    private Boolean isActive;
    private List<ProductImageDTO> images;
    private List<ProductVariantDTO> variants;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

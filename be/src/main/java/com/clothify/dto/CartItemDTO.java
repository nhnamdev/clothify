package com.clothify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {

    private UUID id;
    private ProductDTO product;
    private ProductVariantDTO variant;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
}

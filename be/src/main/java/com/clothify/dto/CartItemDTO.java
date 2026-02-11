package com.clothify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {

    private Long id;
    private ProductDTO product;
    private ProductVariantDTO variant;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
}

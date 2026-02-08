package com.clothify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {

    private UUID id;
    private String productName;
    private String productSku;
    private String variantSize;
    private String variantColor;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
}

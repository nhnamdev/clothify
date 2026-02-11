package com.clothify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantDTO {

    private Long id;
    private String size;
    private String color;
    private Integer stockQuantity;
}

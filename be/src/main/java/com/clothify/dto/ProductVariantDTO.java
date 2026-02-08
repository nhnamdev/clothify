package com.clothify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantDTO {

    private UUID id;
    private String size;
    private String color;
    private Integer stockQuantity;
}

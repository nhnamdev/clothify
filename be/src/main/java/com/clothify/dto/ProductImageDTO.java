package com.clothify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductImageDTO {

    private UUID id;
    private String imageUrl;
    private Integer displayOrder;
    private Boolean isPrimary;
}

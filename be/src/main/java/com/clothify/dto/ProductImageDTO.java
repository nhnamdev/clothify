package com.clothify.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductImageDTO {

    private Long id;
    private String imageUrl;
    private Integer displayOrder;
    private Boolean isPrimary;
}

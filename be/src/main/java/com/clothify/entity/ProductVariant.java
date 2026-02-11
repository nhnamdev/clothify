package com.clothify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_variants", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"product_id", "size", "color"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private String size;

    private String color;

    @Column(name = "stock_quantity", columnDefinition = "INTEGER DEFAULT 0")
    private Integer stockQuantity = 0;
}

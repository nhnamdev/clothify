package com.clothify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid")
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "original_price", precision = 12, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "discount_percent", precision = 5, scale = 2)
    private BigDecimal discountPercent;

    @Column(unique = true)
    private String sku;

    @Column(name = "stock_quantity", columnDefinition = "INTEGER DEFAULT 0")
    private Integer stockQuantity = 0;

    @Column(precision = 3, scale = 2, columnDefinition = "DECIMAL(3,2) DEFAULT 0")
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "review_count", columnDefinition = "INTEGER DEFAULT 0")
    private Integer reviewCount = 0;

    @Column(name = "is_new", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isNew = false;

    @Column(name = "is_featured", columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isFeatured = false;

    @Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

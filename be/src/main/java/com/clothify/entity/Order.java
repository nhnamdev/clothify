package com.clothify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Profile user;

    @Column(name = "order_number", unique = true, nullable = false)
    private String orderNumber;

    // Shipping information
    @Column(name = "shipping_name", nullable = false)
    private String shippingName;

    @Column(name = "shipping_phone", nullable = false)
    private String shippingPhone;

    @Column(name = "shipping_email")
    private String shippingEmail;

    @Column(name = "shipping_address", nullable = false)
    private String shippingAddress;

    @Column(name = "shipping_ward")
    private String shippingWard;

    @Column(name = "shipping_district")
    private String shippingDistrict;

    @Column(name = "shipping_city")
    private String shippingCity;

    @Column(name = "shipping_postal_code")
    private String shippingPostalCode;

    // Pricing
    @Column(name = "subtotal_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotalAmount;

    @Column(name = "shipping_amount", precision = 12, scale = 2, columnDefinition = "DECIMAL(12,2) DEFAULT 0")
    private BigDecimal shippingAmount = BigDecimal.ZERO;

    @Column(name = "discount_amount", precision = 12, scale = 2, columnDefinition = "DECIMAL(12,2) DEFAULT 0")
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @ManyToOne
    @JoinColumn(name = "discount_code_id")
    private DiscountCode discountCode;

    // Status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'pending'")
    private OrderStatus status = OrderStatus.pending;

    // Payment
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", columnDefinition = "VARCHAR(20) DEFAULT 'cod'")
    private PaymentMethod paymentMethod = PaymentMethod.cod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", columnDefinition = "VARCHAR(20) DEFAULT 'pending'")
    private PaymentStatus paymentStatus = PaymentStatus.pending;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    // Delivery
    @Column(name = "shipped_at")
    private LocalDateTime shippedAt;

    @Column(name = "delivered_at")
    private LocalDateTime deliveredAt;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    @Column(name = "cancel_reason", columnDefinition = "TEXT")
    private String cancelReason;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum OrderStatus {
        pending, processing, shipping, delivered, cancelled, refunded
    }

    public enum PaymentMethod {
        cod, qr, card
    }

    public enum PaymentStatus {
        pending, paid, failed
    }
}

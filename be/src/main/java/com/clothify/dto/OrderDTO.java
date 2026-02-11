package com.clothify.dto;

import com.clothify.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;
    private String orderNumber;
    private String shippingName;
    private String shippingPhone;
    private String shippingEmail;
    private String shippingAddress;
    private String shippingWard;
    private String shippingDistrict;
    private String shippingCity;
    private String shippingPostalCode;
    private BigDecimal subtotalAmount;
    private BigDecimal shippingAmount;
    private BigDecimal discountAmount;
    private BigDecimal totalAmount;
    private String discountCode;
    private Order.OrderStatus status;
    private Order.PaymentMethod paymentMethod;
    private Order.PaymentStatus paymentStatus;
    private LocalDateTime paymentDate;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
    private LocalDateTime cancelledAt;
    private String cancelReason;
    private String notes;
    private List<OrderItemDTO> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

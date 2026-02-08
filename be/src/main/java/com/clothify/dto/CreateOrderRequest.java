package com.clothify.dto;

import com.clothify.entity.Order;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {

    @NotBlank(message = "Shipping name is required")
    private String shippingName;

    @NotBlank(message = "Shipping phone is required")
    private String shippingPhone;

    @Email(message = "Invalid email format")
    private String shippingEmail;

    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;

    private String shippingWard;
    private String shippingDistrict;

    @NotBlank(message = "Shipping city is required")
    private String shippingCity;

    private String shippingPostalCode;

    private String discountCode;

    @NotNull(message = "Payment method is required")
    private Order.PaymentMethod paymentMethod;

    private String notes;

    @NotEmpty(message = "Order items cannot be empty")
    private List<CreateOrderItemRequest> items;
}

package com.clothify.controller;

import com.clothify.dto.ApiResponse;
import com.clothify.dto.CreateOrderRequest;
import com.clothify.dto.OrderDTO;
import com.clothify.entity.Order;
import com.clothify.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/{userId}/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Order management APIs")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Create new order")
    public ResponseEntity<ApiResponse<OrderDTO>> createOrder(
            @PathVariable Long userId,
            @Valid @RequestBody CreateOrderRequest request) {
        OrderDTO order = orderService.createOrder(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Đặt hàng thành công", order));
    }

    @GetMapping("/{orderId}")
    @Operation(summary = "Get order by ID")
    public ResponseEntity<ApiResponse<OrderDTO>> getOrderById(
            @PathVariable Long userId,
            @PathVariable Long orderId) {
        OrderDTO order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    @GetMapping
    @Operation(summary = "Get user's orders")
    public ResponseEntity<ApiResponse<Page<OrderDTO>>> getUserOrders(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<OrderDTO> orders = orderService.getUserOrders(userId, page, size);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @PatchMapping("/{orderId}/status")
    @Operation(summary = "Update order status")
    public ResponseEntity<ApiResponse<OrderDTO>> updateOrderStatus(
            @PathVariable Long userId,
            @PathVariable Long orderId,
            @RequestParam Order.OrderStatus status) {
        OrderDTO order = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật trạng thái đơn hàng", order));
    }
}

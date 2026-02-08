package com.clothify.controller;

import com.clothify.dto.AddToCartRequest;
import com.clothify.dto.ApiResponse;
import com.clothify.dto.CartItemDTO;
import com.clothify.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users/{userId}/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Shopping cart management APIs")
public class CartController {

    private final CartService cartService;

    @GetMapping
    @Operation(summary = "Get user's cart")
    public ResponseEntity<ApiResponse<List<CartItemDTO>>> getCart(@PathVariable UUID userId) {
        List<CartItemDTO> cart = cartService.getCart(userId);
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    @Operation(summary = "Add item to cart")
    public ResponseEntity<ApiResponse<CartItemDTO>> addToCart(
            @PathVariable UUID userId,
            @Valid @RequestBody AddToCartRequest request) {
        CartItemDTO cartItem = cartService.addToCart(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Đã thêm vào giỏ hàng", cartItem));
    }

    @PutMapping("/items/{cartItemId}")
    @Operation(summary = "Update cart item quantity")
    public ResponseEntity<ApiResponse<CartItemDTO>> updateCartItem(
            @PathVariable UUID userId,
            @PathVariable UUID cartItemId,
            @RequestParam Integer quantity) {
        CartItemDTO cartItem = cartService.updateCartItem(cartItemId, quantity);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật giỏ hàng", cartItem));
    }

    @DeleteMapping("/items/{cartItemId}")
    @Operation(summary = "Remove item from cart")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable UUID userId,
            @PathVariable UUID cartItemId) {
        cartService.removeFromCart(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    @Operation(summary = "Clear cart")
    public ResponseEntity<Void> clearCart(@PathVariable UUID userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    @Operation(summary = "Get cart item count")
    public ResponseEntity<ApiResponse<Long>> getCartItemCount(@PathVariable UUID userId) {
        Long count = cartService.getCartItemCount(userId);
        return ResponseEntity.ok(ApiResponse.success(count));
    }
}

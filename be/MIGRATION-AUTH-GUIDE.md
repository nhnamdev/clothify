# 🔄 Migration Guide: Cập nhật Controllers với Supabase Auth

## Cách Update Existing Controllers

### Ví dụ: CartController

**❌ TRƯỚC (không an toàn - nhận userId từ URL):**

```java
@RestController
@RequestMapping("/users/{userId}/cart")
public class CartController {
    
    @GetMapping
    public ResponseEntity<ApiResponse<CartDTO>> getCart(@PathVariable UUID userId) {
        // Bất kỳ ai cũng có thể access cart của người khác bằng cách thay userId!
        CartDTO cart = cartService.getCart(userId);
        return ResponseEntity.ok(ApiResponse.success(cart));
    }
}
```

**✅ SAU (an toàn - lấy userId từ JWT):**

## Option 1: Đổi URL sang `/users/me/...`

```java
package com.clothify.controller;

import com.clothify.dto.ApiResponse;
import com.clothify.dto.CartDTO;
import com.clothify.dto.CartItemRequestDTO;
import com.clothify.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users/me/cart")  // ← Đổi từ /users/{userId}/cart
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    /**
     * Lấy giỏ hàng của user hiện tại
     * GET /api/v1/users/me/cart
     * Authorization: Bearer <jwt-token>
     */
    @GetMapping
    public ResponseEntity<ApiResponse<CartDTO>> getMyCart(
            @AuthenticationPrincipal UUID userId  // ← userId từ JWT, không phải URL
    ) {
        CartDTO cart = cartService.getCart(userId);
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    /**
     * Thêm sản phẩm vào giỏ hàng
     * POST /api/v1/users/me/cart/items
     */
    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartItemDTO>> addToCart(
            @AuthenticationPrincipal UUID userId,  // ← Từ JWT
            @RequestBody CartItemRequestDTO request
    ) {
        CartItemDTO item = cartService.addToCart(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(item));
    }

    /**
     * Cập nhật số lượng item
     * PUT /api/v1/users/me/cart/items/{itemId}
     */
    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartItemDTO>> updateCartItem(
            @AuthenticationPrincipal UUID userId,
            @PathVariable UUID itemId,
            @RequestParam Integer quantity
    ) {
        CartItemDTO item = cartService.updateCartItem(userId, itemId, quantity);
        return ResponseEntity.ok(ApiResponse.success(item));
    }

    /**
     * Xóa item khỏi giỏ hàng
     * DELETE /api/v1/users/me/cart/items/{itemId}
     */
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeFromCart(
            @AuthenticationPrincipal UUID userId,
            @PathVariable UUID itemId
    ) {
        cartService.removeFromCart(userId, itemId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Xóa toàn bộ giỏ hàng
     * DELETE /api/v1/users/me/cart
     */
    @DeleteMapping
    public ResponseEntity<Void> clearCart(
            @AuthenticationPrincipal UUID userId
    ) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Đếm số items trong giỏ hàng
     * GET /api/v1/users/me/cart/count
     */
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Integer>> getCartItemCount(
            @AuthenticationPrincipal UUID userId
    ) {
        Integer count = cartService.getCartItemCount(userId);
        return ResponseEntity.ok(ApiResponse.success(count));
    }
}
```

### Frontend Update:

**TRƯỚC:**
```javascript
// Cần truyền userId vào URL
const userId = '123e4567-e89b-12d3-a456-426614174000'
await api.get(`/users/${userId}/cart`)
```

**SAU:**
```javascript
// Không cần userId, backend tự lấy từ JWT
await api.get('/users/me/cart')
```

---

## Option 2: Giữ URL cũ nhưng validate userId

Nếu muốn giữ nguyên API URLs cho backward compatibility:

```java
@RestController
@RequestMapping("/users/{userId}/cart")
public class CartController {

    @GetMapping
    public ResponseEntity<ApiResponse<CartDTO>> getCart(
            @PathVariable UUID userId,
            @AuthenticationPrincipal UUID authenticatedUserId  // ← Từ JWT
    ) {
        // Kiểm tra userId trong URL phải khớp với userId từ JWT
        if (!userId.equals(authenticatedUserId)) {
            throw new UnauthorizedException("Cannot access other user's cart");
        }
        
        CartDTO cart = cartService.getCart(userId);
        return ResponseEntity.ok(ApiResponse.success(cart));
    }
}
```

**Nhược điểm:** Vẫn phải truyền userId trong URL (redundant).

---

## 📋 Checklist Migration

### 1. CartController
- [ ] Đổi `@RequestMapping("/users/{userId}/cart")` → `"/users/me/cart"`
- [ ] Thêm `@AuthenticationPrincipal UUID userId` vào các methods
- [ ] Xóa `@PathVariable UUID userId`
- [ ] Update tests

### 2. OrderController
- [ ] Đổi `@RequestMapping("/users/{userId}/orders")` → `"/users/me/orders"`
- [ ] Thêm `@AuthenticationPrincipal UUID userId` vào các methods
- [ ] Xóa `@PathVariable UUID userId`
- [ ] Update tests

### 3. WishlistController (nếu có)
- [ ] Tương tự như Cart/Order

### 4. Frontend Update
```javascript
// Thay đổi tất cả API calls
// BEFORE:
await api.get(`/users/${userId}/cart`)
await api.post(`/users/${userId}/orders`, data)

// AFTER:
await api.get('/users/me/cart')
await api.post('/users/me/orders', data)
```

### 5. API Documentation Update
- [ ] Update [API-DOCS.md](API-DOCS.md)
- [ ] Update [README-BACKEND.md](README-BACKEND.md)
- [ ] Update [QUICKSTART.md](QUICKSTART.md)

---

## 🧪 Testing Authentication

### Test với cURL:

```bash
# 1. Lấy JWT token từ Supabase (frontend hoặc Supabase dashboard)
TOKEN="<your-supabase-jwt-token>"

# 2. Test authenticated endpoint
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8080/api/v1/users/me/profile

# 3. Test cart endpoint
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8080/api/v1/users/me/cart

# 4. Test thêm vào cart
curl -X POST \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"productId":"...","variantId":"...","quantity":1}' \
     http://localhost:8080/api/v1/users/me/cart/items
```

### Test với Postman:

1. **Headers:**
   - Key: `Authorization`
   - Value: `Bearer <your-jwt-token>`

2. **Request:**
   - GET `http://localhost:8080/api/v1/users/me/cart`

---

## ⚠️ Common Issues

### 1. "Access Denied" / 401 Unauthorized

**Nguyên nhân:**
- Không gửi Authorization header
- Token expired
- JWT secret không khớp

**Fix:**
```bash
# Kiểm tra JWT secret trong application.yml
jwt:
  secret: <copy-from-supabase-dashboard>
```

### 2. "Profile not found"

**Nguyên nhân:**
- Chưa có trigger tạo profile khi user đăng ký

**Fix:**
Chạy SQL trigger trong Supabase (xem [SUPABASE-AUTH-GUIDE.md](SUPABASE-AUTH-GUIDE.md))

### 3. Token decode error

**Nguyên nhân:**
- JWT secret sai
- Token từ wrong environment (staging vs production)

**Fix:**
Verify JWT secret match với Supabase project settings.

---

## 🎯 Best Practices

1. **Never trust userId from URL** - Always extract từ JWT token
2. **Validate ownership** - User chỉ được access resources của mình
3. **Use @AuthenticationPrincipal** - Cleaner code hơn SecurityContextHolder
4. **Handle token expiration** - Frontend auto refresh token
5. **Secure endpoints properly** - Đừng permitAll() những endpoint cần auth

---

## 📚 Related Files

- [SUPABASE-AUTH-GUIDE.md](SUPABASE-AUTH-GUIDE.md) - Full authentication guide
- [JwtService.java](src/main/java/com/clothify/service/JwtService.java) - JWT utility
- [JwtAuthenticationFilter.java](src/main/java/com/clothify/config/JwtAuthenticationFilter.java) - Auth filter
- [SecurityConfig.java](src/main/java/com/clothify/config/SecurityConfig.java) - Security configuration
- [ProfileController.java](src/main/java/com/clothify/controller/ProfileController.java) - Example authenticated controller

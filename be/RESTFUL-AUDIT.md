# 🔍 RESTful API Audit Report - Clothify Backend

## ⚠️ Các Vấn Đề Vi Phạm Chuẩn RESTful

### 🔴 **CRITICAL Issues**

#### 1. **URL Structure - Resource Nesting Không Chuẩn**

**❌ ProductController:**
```java
// SAI: ID path không nên có prefix "/id/"
@GetMapping("/id/{id}")  
GET /api/products/id/abc-123

// ĐÚNG: Resource identifier đơn giản
@GetMapping("/{id}")
GET /api/products/abc-123
```

**❌ CategoryController:**
```java
// SAI: Slug không nên là nested path
@GetMapping("/slug/{slug}")
GET /api/categories/slug/ao-thun

// ĐÚNG: Slug là identifier chính hoặc dùng query param
@GetMapping("/{slug}")
GET /api/categories/ao-thun
// HOẶC
@GetMapping("?slug=ao-thun")
```

#### 2. **User Context Trong URL - Vi Phạm RESTful**

**❌ CartController:**
```java
// SAI: userId trong path không RESTful
@GetMapping("/cart/{userId}")
@PostMapping("/cart/{userId}")
@DeleteMapping("/cart/{userId}")

// ĐÚNG: Nested resource hoặc sử dụng authentication context
@GetMapping("/users/{userId}/cart")
@PostMapping("/users/{userId}/cart/items")
// HOẶC (preferred với Auth):
@GetMapping("/cart")  // Get current user's cart
@PostMapping("/cart/items")
```

**❌ OrderController:**
```java
// SAI
@PostMapping("/orders/{userId}")
@GetMapping("/orders/user/{userId}")

// ĐÚNG
@PostMapping("/users/{userId}/orders")
@GetMapping("/users/{userId}/orders")
// HOẶC (với authentication):
@PostMapping("/orders")  // Current user
@GetMapping("/orders")  // Current user's orders
```

#### 3. **HTTP Status Codes Không Chính Xác**

**❌ Tất cả responses đều return 200 OK:**
```java
// SAI
@PostMapping
return ResponseEntity.ok(...)  // 200 OK

@DeleteMapping
return ResponseEntity.ok(...)  // 200 OK

// ĐÚNG
@PostMapping
return ResponseEntity.status(HttpStatus.CREATED).body(...)  // 201 Created

@DeleteMapping
return ResponseEntity.noContent().build()  // 204 No Content
// HOẶC
return ResponseEntity.ok().build()  // 200 OK with body
```

### 🟡 **MEDIUM Issues**

#### 4. **Endpoint Filtering - Nên Dùng Query Parameters**

**⚠️ ProductController:**
```java
// CÓ THỂ CÂI THIỆN
@GetMapping("/new")
@GetMapping("/featured")
@GetMapping("/category/{categoryId}")
@GetMapping("/price-range")

// CÁCH TỐT HƠN - Dùng query params
@GetMapping  // GET /products?filter=new
@GetMapping  // GET /products?filter=featured
@GetMapping  // GET /products?categoryId={id}
@GetMapping  // GET /products?minPrice=100&maxPrice=500
```

#### 5. **Nested Resources Không Nhất Quán**

**⚠️ Products By Category:**
```java
// HIỆN TẠI
GET /api/products/category/{categoryId}

// NÊN LÀ (RESTful nested resource)
GET /api/categories/{categoryId}/products
```

### 🟢 **GOOD Practices Đã Có**

✅ Sử dụng HTTP methods đúng (GET, POST, PUT/PATCH, DELETE)
✅ Plural nouns cho resources (`/products`, `/orders`, `/categories`)
✅ Pagination với query params (`?page=0&size=20`)
✅ Search với query params (`/search?keyword=`)
✅ PATCH cho partial updates (`PATCH /orders/{id}/status`)
✅ Consistent response wrapper (`ApiResponse<T>`)
✅ Swagger/OpenAPI documentation

---

## ✅ Đề Xuất Cải Thiện

### 📋 **Cấu Trúc URL Chuẩn RESTful**

```java
// ============================================
// PRODUCTS
// ============================================
GET    /api/products                          // List all (with pagination)
GET    /api/products?page=0&size=20          // Pagination
GET    /api/products?categoryId={id}         // Filter by category
GET    /api/products?minPrice=100            // Filter by price
GET    /api/products?filter=new              // Filter new products
GET    /api/products?filter=featured         // Filter featured
GET    /api/products?search=áo                // Search
GET    /api/products/{slug}                   // Get one (by slug)
POST   /api/products                          // Create (admin)
PUT    /api/products/{id}                     // Update (admin)
DELETE /api/products/{id}                     // Delete (admin)

// ============================================
// CATEGORIES  
// ============================================
GET    /api/categories                        // List all
GET    /api/categories/{slug}                 // Get one
GET    /api/categories/{id}/products          // Get products in category
POST   /api/categories                        // Create (admin)
PUT    /api/categories/{id}                   // Update (admin)
DELETE /api/categories/{id}                   // Delete (admin)

// ============================================
// CART (With Authentication)
// ============================================
GET    /api/cart                              // Get current user's cart
POST   /api/cart/items                        // Add item to cart
PUT    /api/cart/items/{itemId}               // Update item quantity
DELETE /api/cart/items/{itemId}               // Remove item
DELETE /api/cart                              // Clear cart

// Alternative (without auth - for admin/testing):
GET    /api/users/{userId}/cart
POST   /api/users/{userId}/cart/items
PUT    /api/users/{userId}/cart/items/{itemId}
DELETE /api/users/{userId}/cart/items/{itemId}
DELETE /api/users/{userId}/cart

// ============================================
// ORDERS (With Authentication)
// ============================================
GET    /api/orders                            // Get current user's orders
GET    /api/orders/{orderId}                  // Get specific order
POST   /api/orders                            // Create new order
PATCH  /api/orders/{orderId}/status           // Update status (admin)
DELETE /api/orders/{orderId}                  // Cancel order

// Alternative (without auth):
GET    /api/users/{userId}/orders
POST   /api/users/{userId}/orders

// ============================================
// WISHLISTS (Future)
// ============================================
GET    /api/wishlist                          // Get current user's wishlist
POST   /api/wishlist/items                    // Add to wishlist
DELETE /api/wishlist/items/{itemId}           // Remove from wishlist

// ============================================
// REVIEWS
// ============================================
GET    /api/products/{productId}/reviews      // Get product reviews
POST   /api/products/{productId}/reviews      // Add review
PUT    /api/reviews/{reviewId}                // Update review
DELETE /api/reviews/{reviewId}                // Delete review

// ============================================
// ADDRESSES (User-specific)
// ============================================
GET    /api/addresses                         // Get current user's addresses
GET    /api/addresses/{addressId}             // Get specific address
POST   /api/addresses                         // Create address
PUT    /api/addresses/{addressId}             // Update address
DELETE /api/addresses/{addressId}             // Delete address
PATCH  /api/addresses/{addressId}/default     // Set as default

// ============================================
// STORES (Public)
// ============================================
GET    /api/stores                            // List all stores
GET    /api/stores/{storeId}                  // Get specific store
GET    /api/stores?city=TP.HCM                // Filter by city
```

### 🎯 **HTTP Status Codes Chuẩn**

```java
// GET requests
200 OK              - Success with body
404 Not Found       - Resource not found

// POST requests
201 Created         - Resource created successfully
400 Bad Request     - Invalid input data
409 Conflict        - Resource already exists

// PUT/PATCH requests
200 OK              - Updated successfully with response
204 No Content      - Updated successfully without response
404 Not Found       - Resource not found

// DELETE requests
204 No Content      - Deleted successfully
200 OK              - Deleted with confirmation message
404 Not Found       - Resource not found
```

### 📦 **Response Format Chuẩn**

```java
// Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": { /* resource data */ },
  "timestamp": "2026-02-08T10:30:00Z"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Product not found",
    "details": null
  },
  "timestamp": "2026-02-08T10:30:00Z"
}

// Validation Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "productId": "Product ID is required",
      "quantity": "Quantity must be at least 1"
    }
  },
  "timestamp": "2026-02-08T10:30:00Z"
}

// Paginated Response
{
  "success": true,
  "data": {
    "content": [ /* items */ ],
    "pagination": {
      "page": 0,
      "size": 20,
      "totalElements": 150,
      "totalPages": 8
    }
  }
}
```

---

## 🔧 Code Examples - Cải Thiện

### Example 1: ProductController (Improved)

```java
@RestController
@RequestMapping("/products")
public class ProductController {

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductDTO>>> listProducts(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String filter, // "new", "featured", "top-rated"
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Page<ProductDTO> products = productService.listProducts(
            categoryId, minPrice, maxPrice, filter, search, page, size
        );
        return ResponseEntity.ok(ApiResponse.success(products));
    }

    @GetMapping("/{identifier}") // Can be ID or slug
    public ResponseEntity<ApiResponse<ProductDTO>> getProduct(@PathVariable String identifier) {
        ProductDTO product = productService.getProduct(identifier);
        return ResponseEntity.ok(ApiResponse.success(product));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(@Valid @RequestBody CreateProductRequest request) {
        ProductDTO product = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(product));
    }
}
```

### Example 2: CartController (Improved with Auth)

```java
@RestController
@RequestMapping("/cart")
public class CartController {

    @GetMapping
    public ResponseEntity<ApiResponse<CartDTO>> getCurrentUserCart(
            @AuthenticationPrincipal User currentUser) {
        CartDTO cart = cartService.getCart(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartItemDTO>> addToCart(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody AddToCartRequest request) {
        CartItemDTO item = cartService.addToCart(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(item));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<CartItemDTO>> updateCartItem(
            @PathVariable UUID itemId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        CartItemDTO item = cartService.updateCartItem(itemId, request);
        return ResponseEntity.ok(ApiResponse.success(item));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable UUID itemId) {
        cartService.removeCartItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(@AuthenticationPrincipal User currentUser) {
        cartService.clearCart(currentUser.getId());
        return ResponseEntity.noContent().build();
    }
}
```

### Example 3: Nested Resources

```java
@RestController
@RequestMapping("/categories")
public class CategoryController {

    // GET /categories/{categoryId}/products
    @GetMapping("/{categoryId}/products")
    public ResponseEntity<ApiResponse<Page<ProductDTO>>> getCategoryProducts(
            @PathVariable UUID categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Page<ProductDTO> products = productService.getProductsByCategory(categoryId, page, size);
        return ResponseEntity.ok(ApiResponse.success(products));
    }
}

@RestController
@RequestMapping("/products")
public class ProductController {

    // GET /products/{productId}/reviews
    @GetMapping("/{productId}/reviews")
    public ResponseEntity<ApiResponse<Page<ReviewDTO>>> getProductReviews(
            @PathVariable UUID productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ReviewDTO> reviews = reviewService.getProductReviews(productId, page, size);
        return ResponseEntity.ok(ApiResponse.success(reviews));
    }

    // POST /products/{productId}/reviews
    @PostMapping("/{productId}/reviews")
    public ResponseEntity<ApiResponse<ReviewDTO>> createReview(
            @PathVariable UUID productId,
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody CreateReviewRequest request) {
        ReviewDTO review = reviewService.createReview(productId, currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(review));
    }
}
```

---

## 📊 Score Card

| Tiêu Chí | Điểm | Ghi Chú |
|----------|------|---------|
| **HTTP Methods** | 8/10 | ✅ Sử dụng đúng methods, thiếu status codes |
| **URL Structure** | 5/10 | ❌ Nhiều endpoint không chuẩn RESTful |
| **Resource Naming** | 9/10 | ✅ Plural nouns, rõ ràng |
| **Status Codes** | 3/10 | ❌ Tất cả đều 200, thiếu 201, 204, 404 |
| **Error Handling** | 6/10 | ⚠️ Có GlobalExceptionHandler nhưng chưa đủ |
| **Pagination** | 10/10 | ✅ Chuẩn với query params |
| **Filtering** | 7/10 | ⚠️ Một số dùng path, nên dùng query params |
| **Documentation** | 10/10 | ✅ Swagger/OpenAPI đầy đủ |
| **Consistency** | 6/10 | ⚠️ Response format nhất quán, URL không nhất quán |
| **Versioning** | 0/10 | ❌ Chưa có API versioning |

**TỔNG ĐIỂM: 64/100** - 🟡 **CẦN CẢI THIỆN**

---

## 🎯 Priority Actions

### 🔴 HIGH Priority (Làm ngay)
1. Fix URL structure: Remove `/id/` prefix, `/slug/` prefix
2. Implement proper HTTP status codes (201, 204, 404)
3. Refactor Cart & Order endpoints to use `/users/{userId}/` or auth context
4. Consolidate product filtering to use query params

### 🟡 MEDIUM Priority (Làm sau)
5. Add API versioning (`/api/v1/`)
6. Improve error response format with error codes
7. Add HATEOAS links (optional)
8. Implement rate limiting

### 🟢 LOW Priority (Optional)
9. Add ETags for caching
10. Add partial response with `fields` parameter
11. Add bulk operations endpoints

---

## 📚 References

- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)
- [Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)

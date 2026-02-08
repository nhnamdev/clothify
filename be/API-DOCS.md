# 📚 Clothify API Documentation - RESTful v1

## 🌐 Base URL

```
http://localhost:8080/api/v1
```

## 📖 Swagger Documentation

```
http://localhost:8080/api/v1/swagger-ui.html
```

---

## 🛍️ Products API

### List All Products
```http
GET /api/v1/products
```

**Query Parameters:**
- `page` (number, default: 0) - Page number
- `size` (number, default: 20) - Page size
- `sortBy` (string, default: "createdAt") - Sort field

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "content": [...],
    "totalPages": 10,
    "totalElements": 200,
    "size": 20,
    "number": 0
  }
}
```

### Get Product by ID or Slug
```http
GET /api/v1/products/{identifier}
```

**Path Parameters:**
- `identifier` - Product UUID or slug (e.g., `ao-thun-one-life`)

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "name": "Áo Thun One Life",
    "slug": "ao-thun-one-life",
    "price": 260000,
    "images": [...],
    "variants": [...]
  }
}
```

### Filter Products
```http
GET /api/v1/products/filter
```

**Query Parameters:**
- `categoryId` (UUID) - Filter by category
- `minPrice` (number) - Minimum price
- `maxPrice` (number) - Maximum price
- `filter` (string) - Special filter: `new`, `featured`, `top-rated`
- `search` (string) - Search keyword
- `page` (number, default: 0)
- `size` (number, default: 20)
- `sortBy` (string, default: "createdAt")

**Examples:**
```http
# Get new products
GET /api/v1/products/filter?filter=new

# Get featured products
GET /api/v1/products/filter?filter=featured

# Search products
GET /api/v1/products/filter?search=áo thun

# Filter by category
GET /api/v1/products/filter?categoryId=uuid-here

# Filter by price range
GET /api/v1/products/filter?minPrice=100000&maxPrice=500000
```

**Response:** `200 OK` (Same as List All Products)

---

## 📂 Categories API

### List All Categories
```http
GET /api/v1/categories
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "uuid",
      "name": "Áo",
      "slug": "ao",
      "description": "Các loại áo thời trang"
    }
  ]
}
```

### Get Category by ID or Slug
```http
GET /api/v1/categories/{identifier}
```

**Path Parameters:**
- `identifier` - Category UUID or slug

**Response:** `200 OK`

### Get Products in Category
```http
GET /api/v1/categories/{categoryId}/products
```

**Path Parameters:**
- `categoryId` (UUID) - Category ID

**Query Parameters:**
- `page` (number, default: 0)
- `size` (number, default: 20)

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "content": [/* products */],
    "totalPages": 5,
    "totalElements": 100
  }
}
```

---

## 🛒 Cart API

**Base Path:** `/api/v1/users/{userId}/cart`

### Get User's Cart
```http
GET /api/v1/users/{userId}/cart
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "uuid",
      "product": {...},
      "variant": {...},
      "quantity": 2,
      "price": 260000,
      "subtotal": 520000
    }
  ]
}
```

### Add Item to Cart
```http
POST /api/v1/users/{userId}/cart/items
```

**Request Body:**
```json
{
  "productId": "uuid",
  "variantId": "uuid",
  "quantity": 1
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Đã thêm vào giỏ hàng",
  "data": {
    "id": "uuid",
    "product": {...},
    "quantity": 1
  }
}
```

### Update Cart Item
```http
PUT /api/v1/users/{userId}/cart/items/{cartItemId}?quantity=3
```

**Query Parameters:**
- `quantity` (number, required) - New quantity

**Response:** `200 OK`

### Remove Cart Item
```http
DELETE /api/v1/users/{userId}/cart/items/{cartItemId}
```

**Response:** `204 No Content`

### Clear Cart
```http
DELETE /api/v1/users/{userId}/cart
```

**Response:** `204 No Content`

### Get Cart Item Count
```http
GET /api/v1/users/{userId}/cart/count
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": 5
}
```

---

## 📦 Orders API

**Base Path:** `/api/v1/users/{userId}/orders`

### Create Order
```http
POST /api/v1/users/{userId}/orders
```

**Request Body:**
```json
{
  "shippingName": "Nguyễn Văn A",
  "shippingPhone": "0123456789",
  "shippingEmail": "email@example.com",
  "shippingAddress": "123 Đường ABC",
  "shippingWard": "Phường 1",
  "shippingDistrict": "Quận 1",
  "shippingCity": "TP. Hồ Chí Minh",
  "shippingPostalCode": "70000",
  "discountCode": "SUMMER2026",
  "paymentMethod": "cod",
  "notes": "Giao hàng giờ hành chính",
  "items": [
    {
      "productId": "uuid",
      "variantId": "uuid",
      "quantity": 2
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Đặt hàng thành công",
  "data": {
    "id": "uuid",
    "orderNumber": "CLT1707375600000",
    "status": "pending",
    "totalAmount": 520000,
    "items": [...]
  }
}
```

### Get User's Orders
```http
GET /api/v1/users/{userId}/orders
```

**Query Parameters:**
- `page` (number, default: 0)
- `size` (number, default: 10)

**Response:** `200 OK`

### Get Order by ID
```http
GET /api/v1/users/{userId}/orders/{orderId}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "orderNumber": "CLT1707375600000",
    "status": "pending",
    "paymentMethod": "cod",
    "paymentStatus": "pending",
    "items": [...]
  }
}
```

### Update Order Status
```http
PATCH /api/v1/users/{userId}/orders/{orderId}/status?status=shipping
```

**Query Parameters:**
- `status` (string, required) - Order status
  - `pending`
  - `processing`
  - `shipping`
  - `delivered`
  - `cancelled`
  - `refunded`

**Response:** `200 OK`

---

## 🔒 HTTP Status Codes

### Success Codes
- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `204 No Content` - Request succeeded, no content to return

### Client Error Codes
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict

### Server Error Codes
- `500 Internal Server Error` - Server error

---

## 📋 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

### Validation Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "fieldName": "Error message"
  }
}
```

---

## 🔧 Query Parameter Conventions

### Pagination
- `page` - Zero-based page number (default: 0)
- `size` - Number of items per page (default: varies by endpoint)

### Sorting
- `sortBy` - Field name to sort by (default: "createdAt")
- Sort direction is DESC by default

### Filtering
- Use query parameters for filtering instead of path parameters
- Example: `/products/filter?filter=new&categoryId=uuid`

---

## 🚀 Quick Examples

### Browse Products
```bash
# Get all products
curl http://localhost:8080/api/v1/products

# Get new products
curl http://localhost:8080/api/v1/products/filter?filter=new

# Search products
curl http://localhost:8080/api/v1/products/filter?search=áo

# Get products in category
curl http://localhost:8080/api/v1/categories/{categoryId}/products
```

### Shopping Flow
```bash
# 1. Add to cart
curl -X POST http://localhost:8080/api/v1/users/{userId}/cart/items \
  -H "Content-Type: application/json" \
  -d '{"productId":"uuid","quantity":1}'

# 2. View cart
curl http://localhost:8080/api/v1/users/{userId}/cart

# 3. Create order
curl -X POST http://localhost:8080/api/v1/users/{userId}/orders \
  -H "Content-Type: application/json" \
  -d '{"shippingName":"Test","shippingPhone":"0123456789",...}'

# 4. Check orders
curl http://localhost:8080/api/v1/users/{userId}/orders
```

---

## 📌 Notes

1. **API Versioning:** All endpoints are under `/api/v1/`
2. **Authentication:** Currently userId is required in path. Will be replaced with authentication context in future.
3. **CORS:** Configured for `http://localhost:5173` and `:3000`
4. **Content-Type:** Always use `application/json` for request/response bodies
5. **Date Format:** ISO 8601 format (2026-02-08T10:30:00Z)

---

**Last Updated:** February 8, 2026

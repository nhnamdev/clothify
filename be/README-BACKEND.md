# 🛍️ Clothify Backend - Spring Boot

Backend API cho ứng dụng E-commerce Clothify sử dụng Spring Boot 3 và Supabase PostgreSQL.

## 🚀 Công Nghệ Sử Dụng

- **Spring Boot 3.2.2** - Framework chính
- **Spring Data JPA** - ORM và database operations
- **PostgreSQL** - Database (Supabase)
- **Spring Security** - Authentication & Authorization
- **Lombok** - Reduce boilerplate code
- **ModelMapper** - DTO conversions
- **Springdoc OpenAPI** - API documentation (Swagger)
- **Maven** - Dependency management

## 📋 Yêu Cầu Hệ Thống

- Java 17 hoặc cao hơn
- Maven 3.6+
- PostgreSQL database (Supabase)

## ⚙️ Cài Đặt

### 1. Clone repository

```bash
cd be
```

### 2. Cấu hình Database

File `src/main/resources/application.yml` đã được cấu hình với connection string Supabase:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://db.wtrsgucnentzsyxlszxv.supabase.co:5432/postgres
    username: postgres
    password: Clothifyproject
```

**Lưu ý:** Database schema đã được tạo sẵn ở `supabase-schema.sql`. Đảm bảo schema đã được chạy trước khi start backend.

### 3. Build project

```bash
mvn clean install
```

### 4. Run application

```bash
mvn spring-boot:run
```

Hoặc chạy file JAR:

```bash
java -jar target/clothify-backend-1.0.0.jar
```

Server sẽ chạy tại: **http://localhost:8080/api/v1**

## 📚 API Documentation

Sau khi application chạy, truy cập Swagger UI:

**http://localhost:8080/api/v1/swagger-ui.html**

📖 **Chi tiết API:** Xem file [API-DOCS.md](API-DOCS.md)

## 🔌 API Endpoints (RESTful v1)

### Products

- `GET /api/v1/products` - Lấy tất cả sản phẩm (phân trang)
- `GET /api/v1/products/{identifier}` - Lấy sản phẩm theo ID hoặc slug
- `GET /api/v1/products/filter` - Filter/search sản phẩm
  - Query params: `categoryId`, `minPrice`, `maxPrice`, `filter` (new/featured/top-rated), `search`

### Categories

- `GET /api/v1/categories` - Lấy tất cả danh mục
- `GET /api/v1/categories/{identifier}` - Lấy danh mục theo ID hoặc slug
- `GET /api/v1/categories/{categoryId}/products` - Lấy sản phẩm trong danh mục

### Cart

- `GET /api/v1/users/{userId}/cart` - Lấy giỏ hàng của user
- `POST /api/v1/users/{userId}/cart/items` - Thêm sản phẩm vào giỏ hàng
- `PUT /api/v1/users/{userId}/cart/items/{itemId}?quantity={qty}` - Cập nhật số lượng
- `DELETE /api/v1/users/{userId}/cart/items/{itemId}` - Xóa sản phẩm
- `DELETE /api/v1/users/{userId}/cart` - Xóa toàn bộ giỏ hàng
- `GET /api/v1/users/{userId}/cart/count` - Đếm số lượng items

### Orders

- `POST /api/v1/users/{userId}/orders` - Tạo đơn hàng mới
- `GET /api/v1/users/{userId}/orders` - Lấy danh sách đơn hàng
- `GET /api/v1/users/{userId}/orders/{orderId}` - Lấy chi tiết đơn hàng
- `PATCH /api/v1/users/{userId}/orders/{orderId}/status` - Cập nhật trạng thái

## 📝 Ví Dụ Request

### Thêm vào giỏ hàng

```http
POST /api/v1/users/{userId}/cart/items
Content-Type: application/json

{
  "productId": "uuid-here",
  "variantId": "uuid-here",
  "quantity": 2
}
```

**Response:** `201 Created`

### Tạo đơn hàng

```http
POST /api/v1/users/{userId}/orders
Content-Type: application/json

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
      "productId": "uuid-here",
      "variantId": "uuid-here",
      "quantity": 2
    }
  ]
}
```

**Response:** `201 Created`

## 🗂️ Cấu Trúc Project

```
be/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/clothify/
│       │       ├── ClothifyApplication.java
│       │       ├── config/
│       │       │   ├── CorsConfig.java
│       │       │   ├── SecurityConfig.java
│       │       │   └── ModelMapperConfig.java
│       │       ├── controller/
│       │       │   ├── ProductController.java
│       │       │   ├── CategoryController.java
│       │       │   ├── CartController.java
│       │       │   └── OrderController.java
│       │       ├── dto/
│       │       │   ├── ProductDTO.java
│       │       │   ├── CartItemDTO.java
│       │       │   ├── OrderDTO.java
│       │       │   ├── CreateOrderRequest.java
│       │       │   └── ApiResponse.java
│       │       ├── entity/
│       │       │   ├── Product.java
│       │       │   ├── Category.java
│       │       │   ├── Profile.java
│       │       │   ├── Order.java
│       │       │   ├── CartItem.java
│       │       │   └── ...
│       │       ├── repository/
│       │       │   ├── ProductRepository.java
│       │       │   ├── CategoryRepository.java
│       │       │   ├── OrderRepository.java
│       │       │   └── ...
│       │       ├── service/
│       │       │   ├── ProductService.java
│       │       │   ├── CartService.java
│       │       │   ├── OrderService.java
│       │       │   └── CategoryService.java
│       │       └── exception/
│       │           └── GlobalExceptionHandler.java
│       └── resources/
│           └── application.yml
└── pom.xml
```

## 🔒 Security & CORS

- CORS được cấu hình cho origins: `http://localhost:5173`, `http://localhost:3000`
- Public endpoints: `/api/products/**`, `/api/categories/**`, `/api/stores/**`
- Protected endpoints yêu cầu authentication (Cart, Orders, Profile)

## 🧪 Testing

```bash
# Run unit tests
mvn test

# Run with coverage
mvn clean test jacoco:report
```

## 📦 Database Entities

- **Profile** - User profiles với membership tiers (BRONZE, SILVER, GOLD, PLATINUM)
- **Product** - Sản phẩm với variants, images
- **Category** - Danh mục phân cấp
- **CartItem** - Giỏ hàng
- **Order** - Đơn hàng với nhiều trạng thái
- **OrderItem** - Chi tiết đơn hàng
- **Review** - Đánh giá sản phẩm
- **Address** - Địa chỉ giao hàng
- **DiscountCode** - Mã giảm giá
- **Store** - Cửa hàng

## 🚢 Deployment

### Build for production

```bash
mvn clean package -DskipTests
```

File JAR sẽ được tạo tại `target/clothify-backend-1.0.0.jar`

### Run production

```bash
java -jar target/clothify-backend-1.0.0.jar
```

## 🔧 Troubleshooting

### Lỗi kết nối database

Kiểm tra:
- Connection string trong `application.yml`
- Database đã chạy schema migration chưa
- Network có thể truy cập Supabase không

### Lỗi port 8080 đã được sử dụng

Thay đổi port trong `application.yml`:

```yaml
server:
  port: 8081
```

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
- Console logs khi application start
- Swagger UI để test API endpoints
- Database connection

---

**Happy Coding! 🎉**

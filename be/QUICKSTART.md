# 🚀 Quick Start Guide - Clothify Backend

## Bước 1: Kiểm tra Java & Maven

```bash
java -version
# Cần Java 17+

mvn -version
# Cần Maven 3.6+
```

## Bước 2: Đảm bảo Database đã setup

```bash
# Kiểm tra Supabase đã chạy schema chưa
# Nếu chưa, chạy file supabase-schema.sql trong SQL Editor của Supabase
```

## Bước 3: Build & Run

```bash
# Clean và build project
mvn clean install

# Run application
mvn spring-boot:run
```

Hoặc:

```bash
# Build JAR file
mvn clean package -DskipTests

# Run JAR
java -jar target/clothify-backend-1.0.0.jar
```

## Bước 4: Verify Application

Mở browser và truy cập:

- **API Base URL**: http://localhost:8080/api/v1
- **Swagger UI**: http://localhost:8080/api/v1/swagger-ui.html

Xem console log, nên thấy:

```
🚀 Clothify Backend is running!
📚 API Docs: http://localhost:8080/api/v1/swagger-ui.html
🗄️  Database: Supabase PostgreSQL
```

## Bước 5: Insert Sample Data (Optional)

```bash
# Chạy file sample-data.sql trong Supabase SQL Editor
# Hoặc sử dụng psql:

psql postgresql://postgres:Clothifyproject@db.wtrsgucnentzsyxlszxv.supabase.co:5432/postgres -f sample-data.sql
```

## Bước 6: Test API

### Test với cURL:

```bash
# Get all products
curl http://localhost:8080/api/v1/products

# Get categories
curl http://localhost:8080/api/v1/categories

# Get product by slug
curl http://localhost:8080/api/v1/products/ao-thun-one-life
```

### Hoặc dùng Swagger UI:

1. Mở http://localhost:8080/api/v1/swagger-ui.html
2. Chọn controller (Products, Categories, etc.)
3. Chọn endpoint muốn test
4. Click "Try it out"
5. Nhập parameters (nếu cần)
6. Click "Execute"

## 🔥 Các API Hay Dùng

### Products API

```bash
# Lấy tất cả sản phẩm (page 0, size 10)
GET http://localhost:8080/api/v1/products?page=0&size=10

# Lấy sản phẩm theo slug hoặc ID
GET http://localhost:8080/api/v1/products/ao-thun-one-life
GET http://localhost:8080/api/v1/products/{uuid}

# Tìm kiếm sản phẩm
GET http://localhost:8080/api/v1/products/filter?search=áo

# Lấy sản phẩm mới
GET http://localhost:8080/api/v1/products/filter?filter=new

# Lấy sản phẩm nổi bật
GET http://localhost:8080/api/v1/products/filter?filter=featured

# Lấy sản phẩm theo danh mục
GET http://localhost:8080/api/v1/products/filter?categoryId={uuid}
GET http://localhost:8080/api/v1/categories/{categoryId}/products
```

### Cart API

```bash
# Lấy giỏ hàng (cần userId từ Supabase Auth)
GET http://localhost:8080/api/v1/users/{userId}/cart

# Đếm items trong giỏ hàng
GET http://localhost:8080/api/v1/users/{userId}/cart/count

# Thêm vào giỏ hàng → 201 Created
POST http://localhost:8080/api/v1/users/{userId}/cart/items
Content-Type: application/json

{
  "productId": "uuid-here",
  "variantId": "uuid-here",
  "quantity": 1
}

# Cập nhật số lượng
PUT http://localhost:8080/api/v1/users/{userId}/cart/items/{itemId}?quantity=3

# Xóa item → 204 No Content
DELETE http://localhost:8080/api/v1/users/{userId}/cart/items/{itemId}

# Xóa toàn bộ giỏ hàng → 204 No Content
DELETE http://localhost:8080/api/v1/users/{userId}/cart
```

### Order API

```bash
# Tạo đơn hàng → 201 Created
POST http://localhost:8080/api/v1/users/{userId}/orders
Content-Type: application/json

{
  "shippingName": "Nguyễn Văn A",
  "shippingPhone": "0123456789",
  "shippingAddress": "123 ABC",
  "shippingWard": "Phường 1",
  "shippingDistrict": "Quận 1",
  "shippingCity": "TP. HCM",
  "shippingPostalCode": "70000",
  "paymentMethod": "cod",
  "items": [
    {
      "productId": "uuid-here",
      "variantId": "uuid-here",
      "quantity": 1
    }
  ]
}

# Lấy tất cả đơn hàng của user
GET http://localhost:8080/api/v1/users/{userId}/orders

# Lấy chi tiết đơn hàng
GET http://localhost:8080/api/v1/users/{userId}/orders/{orderId}

# Cập nhật trạng thái đơn hàng
PATCH http://localhost:8080/api/v1/users/{userId}/orders/{orderId}/status?status=PROCESSING
```

## 🔧 Troubleshooting

### Port 8080 đã được sử dụng

```bash
# Windows: Tìm và kill process
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Hoặc đổi port trong application.yml
server:
  port: 8081
```

### Lỗi connection refused

- Kiểm tra Supabase database có running không
- Kiểm tra connection string trong application.yml
- Kiểm tra firewall/network

### Lỗi "Table doesn't exist"

- Chưa chạy schema migration
- Chạy file `supabase-schema.sql` trong Supabase SQL Editor

## 📊 Monitoring

```bash
# Watch logs
tail -f logs/spring.log  # Nếu có config logging to file

# Hoặc xem console output khi run với mvn spring-boot:run
```

## 🎯 Next Steps

1. ✅ Backend đang chạy
2. 🔗 Kết nối frontend React với backend
3. 🧪 Test toàn bộ flow: Browse products → Add to cart → Checkout
4. 🔐 Implement authentication với Supabase Auth
5. 🚢 Deploy backend lên server (Heroku, Railway, etc.)

---

**Happy Coding! 🎉**

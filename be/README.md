# 🗄️ Clothify Database Schema - Supabase

Schema database hoàn chỉnh cho ứng dụng Clothify E-Commerce

## 📋 Mục Lục

- [Cấu Trúc Database](#cấu-trúc-database)
- [Cài Đặt](#cài-đặt)
- [Tables Chi Tiết](#tables-chi-tiết)
- [Relationships](#relationships)
- [Security (RLS)](#security-rls)
- [Sample Queries](#sample-queries)
- [API Examples](#api-examples)

---

## 🏗️ Cấu Trúc Database

### Core Tables

#### 1. **Users & Authentication**
- `profiles` - Thông tin người dùng (extends Supabase Auth)
  - Membership tiers: BRONZE, SILVER, GOLD, PLATINUM
  - Tracking: total_spent, points

#### 2. **Products**
- `categories` - Danh mục sản phẩm (hỗ trợ nested categories)
- `products` - Sản phẩm
- `product_images` - Hình ảnh sản phẩm (multiple images/product)
- `product_variants` - Biến thể (size, màu sắc)

#### 3. **Shopping & Orders**
- `cart_items` - Giỏ hàng
- `wishlist` - Sản phẩm yêu thích
- `orders` - Đơn hàng
- `order_items` - Chi tiết đơn hàng

#### 4. **User Data**
- `addresses` - Địa chỉ giao hàng
- `reviews` - Đánh giá sản phẩm

#### 5. **Marketing**
- `discount_codes` - Mã giảm giá
- `discount_code_usage` - Tracking sử dụng mã

#### 6. **Locations**
- `stores` - Cửa hàng/chi nhánh

---

## 🚀 Cài Đặt

### Bước 1: Tạo Project Supabase
1. Đăng nhập [Supabase Dashboard](https://app.supabase.com)
2. Tạo project mới
3. Đợi database được khởi tạo

### Bước 2: Chạy Migration Script

**Cách 1: Qua Supabase Dashboard**
```bash
# Mở: Project Settings > Database > SQL Editor
# Copy toàn bộ nội dung file supabase-schema.sql
# Paste và Run
```

**Cách 2: Qua Supabase CLI**
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

### Bước 3: Verify Setup
```sql
-- Check tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check RLS policies
SELECT tablename, policyname 
FROM pg_policies;
```

---

## 📊 Tables Chi Tiết

### `profiles`
```sql
- id: UUID (FK to auth.users)
- first_name, last_name, phone, birthday
- total_spent: DECIMAL (tự động tính)
- membership_tier: BRONZE|SILVER|GOLD|PLATINUM (tự động update)
- points: INTEGER
```

**Membership Tiers:**
- **BRONZE**: 0 - 999,999đ
- **SILVER**: 1M - 2,999,999đ (Giảm 5%)
- **GOLD**: 3M - 4,999,999đ (Giảm 10%)
- **PLATINUM**: 5M+ (Giảm 15%)

### `products`
```sql
- id, name, slug, description
- category_id: FK to categories
- price, original_price, discount_percent
- stock_quantity
- rating (auto-calculated), review_count
- is_new, is_featured, is_active
```

### `orders`
```sql
- id, order_number (auto-generated)
- user_id, shipping_address_id
- subtotal, shipping_cost, discount_amount, total_amount
- status: pending|processing|shipping|delivered|cancelled|refunded
- payment_method: cod|qr|card
- payment_status: pending|paid|failed|refunded
```

**Order Flow:**
```
pending → processing → shipping → delivered
                              ↓
                          cancelled
```

---

## 🔗 Relationships

```
users (auth.users)
  ├─ profiles (1:1)
  ├─ addresses (1:n)
  ├─ cart_items (1:n)
  ├─ wishlist (1:n)
  ├─ orders (1:n)
  └─ reviews (1:n)

products
  ├─ product_images (1:n)
  ├─ product_variants (1:n)
  ├─ cart_items (1:n)
  ├─ wishlist (1:n)
  └─ reviews (1:n)

orders
  └─ order_items (1:n)
```

---

## 🔒 Security (RLS)

### Enabled RLS Tables
✅ `profiles` - Users can only view/update own profile  
✅ `addresses` - Users can only manage own addresses  
✅ `cart_items` - Users can only manage own cart  
✅ `wishlist` - Users can only manage own wishlist  
✅ `orders` - Users can only view own orders  
✅ `reviews` - Users can manage own reviews, view approved reviews  

### Public Read Access
✅ `products`, `categories`, `product_images`, `product_variants`, `stores`

### Example Policy:
```sql
-- Users can only view their own cart
CREATE POLICY "Users can view own cart" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);
```

---

## 🔍 Sample Queries

### 1. Get Product with Full Details
```sql
SELECT * FROM product_details 
WHERE slug = 'ao-thun-hoa-tiet-one-life';
```

### 2. Get User's Cart with Product Info
```sql
SELECT 
  ci.*,
  p.name,
  p.price,
  p.image_url,
  pv.size,
  pv.color
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
LEFT JOIN product_variants pv ON ci.variant_id = pv.id
WHERE ci.user_id = auth.uid();
```

### 3. Get User's Order History
```sql
SELECT * FROM order_summary
WHERE user_id = auth.uid()
ORDER BY created_at DESC;
```

### 4. Get Top Rated Products
```sql
SELECT * FROM products
WHERE rating >= 4.0 AND review_count >= 5
ORDER BY rating DESC, review_count DESC
LIMIT 10;
```

### 5. Get Products by Category
```sql
SELECT p.* 
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE c.slug = 'ao-thun'
AND p.is_active = true;
```

### 6. Check Stock Before Order
```sql
SELECT 
  pv.id,
  pv.size,
  pv.color,
  pv.stock_quantity,
  CASE 
    WHEN pv.stock_quantity >= 5 THEN 'in_stock'
    WHEN pv.stock_quantity > 0 THEN 'low_stock'
    ELSE 'out_of_stock'
  END as status
FROM product_variants pv
WHERE pv.product_id = 'product-uuid-here';
```

---

## 💻 API Examples (Supabase Client)

### Setup Client (JavaScript)
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)
```

### 1. Get Products
```javascript
// Get all products with category
const { data: products } = await supabase
  .from('product_details')
  .select('*')
  .eq('is_active', true)
  .order('created_at', { ascending: false })
  .limit(20)

// Get product by slug
const { data: product } = await supabase
  .from('product_details')
  .select('*')
  .eq('slug', 'ao-thun-one-life')
  .single()
```

### 2. Add to Cart
```javascript
const { data, error } = await supabase
  .from('cart_items')
  .upsert({
    user_id: user.id,
    product_id: productId,
    variant_id: variantId,
    quantity: 1
  }, {
    onConflict: 'user_id,product_id,variant_id',
    ignoreDuplicates: false
  })
```

### 3. Create Order
```javascript
// 1. Create order
const { data: order } = await supabase
  .from('orders')
  .insert({
    order_number: `ORD-${Date.now()}`,
    user_id: user.id,
    shipping_address_id: addressId,
    subtotal: 520000,
    shipping_cost: 50000,
    total_amount: 570000,
    payment_method: 'cod',
    status: 'pending'
  })
  .select()
  .single()

// 2. Add order items
const { data: orderItems } = await supabase
  .from('order_items')
  .insert([
    {
      order_id: order.id,
      product_id: product1.id,
      variant_id: variant1.id,
      product_name: product1.name,
      size: 'L',
      quantity: 2,
      unit_price: 260000,
      total_price: 520000
    }
  ])

// 3. Clear cart
await supabase
  .from('cart_items')
  .delete()
  .eq('user_id', user.id)
```

### 4. Add to Wishlist
```javascript
const { data } = await supabase
  .from('wishlist')
  .insert({
    user_id: user.id,
    product_id: productId
  })
  .select()
```

### 5. Submit Review
```javascript
const { data } = await supabase
  .from('reviews')
  .insert({
    product_id: productId,
    user_id: user.id,
    order_id: orderId,
    rating: 5,
    title: 'Sản phẩm rất tốt!',
    comment: 'Chất lượng tuyệt vời, giao hàng nhanh',
    is_verified_purchase: true
  })
```

### 6. Update Profile & Check Membership
```javascript
// Update profile
const { data: profile } = await supabase
  .from('profiles')
  .update({
    first_name: 'Nguyễn',
    last_name: 'Văn A',
    phone: '0901234567'
  })
  .eq('id', user.id)
  .select()
  .single()

// Get membership info
const { data } = await supabase
  .from('profiles')
  .select('membership_tier, total_spent, points')
  .eq('id', user.id)
  .single()
```

### 7. Search Products
```javascript
const { data } = await supabase
  .from('products')
  .select('*, categories(name)')
  .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
  .eq('is_active', true)
```

---

## 🎯 Triggers & Auto-Updates

### 1. **Auto Update Product Rating**
Khi review được thêm/sửa/xóa → tự động tính lại `rating` và `review_count`

### 2. **Auto Update Membership Tier**
Khi order có status = 'delivered' → tự động:
- Cộng dồn `total_spent`
- Update `membership_tier` dựa trên tổng chi tiêu

### 3. **Auto Update Timestamps**
Tất cả tables có `updated_at` tự động update khi record thay đổi

---

## 📈 Performance Indexes

```sql
-- Products: category, slug, rating, created_at
-- Orders: user_id, status, created_at, order_number
-- Reviews: product_id, user_id, rating
-- Cart: user_id
-- Wishlist: user_id
```

---

## 🔧 Maintenance Queries

### Clear Old Carts (older than 30 days)
```sql
DELETE FROM cart_items 
WHERE updated_at < NOW() - INTERVAL '30 days';
```

### Get Sales Statistics
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as order_count,
  SUM(total_amount) as total_revenue,
  AVG(total_amount) as avg_order_value
FROM orders
WHERE status = 'delivered'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Get Top Selling Products
```sql
SELECT 
  p.name,
  COUNT(oi.id) as times_sold,
  SUM(oi.quantity) as total_quantity,
  SUM(oi.total_price) as total_revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'delivered'
GROUP BY p.id, p.name
ORDER BY total_quantity DESC
LIMIT 10;
```

---

## 🚨 Troubleshooting

### RLS Issues
```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check policies
SELECT * FROM pg_policies 
WHERE tablename = 'your_table_name';
```

### Permission Issues
```sql
-- Grant permissions to authenticated users
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
```

---

## 📝 Notes

- **UUID v4** được sử dụng cho tất cả primary keys
- **Timestamps** đều dùng `TIMESTAMP WITH TIME ZONE`
- **Giá tiền** dùng `DECIMAL(12, 2)` để đảm bảo chính xác
- **RLS enabled** cho tất cả sensitive tables
- **Indexes** đã được tối ưu cho các query phổ biến

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Created for Clothify E-Commerce Platform** 🛍️

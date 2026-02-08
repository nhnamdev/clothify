-- ================================================
-- CLOTHIFY E-COMMERCE DATABASE SCHEMA
-- Supabase PostgreSQL Database
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- USERS & AUTHENTICATION
-- ================================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  birthday DATE,
  avatar_url TEXT,
  total_spent DECIMAL(12, 2) DEFAULT 0,
  membership_tier VARCHAR(20) DEFAULT 'BRONZE' CHECK (membership_tier IN ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM')),
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- PRODUCTS & CATEGORIES
-- ================================================

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id),
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  price DECIMAL(12, 2) NOT NULL,
  original_price DECIMAL(12, 2),
  discount_percent INTEGER DEFAULT 0,
  sku VARCHAR(100) UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product images
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product variants (sizes, colors)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(10), -- XS, S, M, L, XL, XXL, 3XL, 4XL
  color VARCHAR(50),
  stock_quantity INTEGER DEFAULT 0,
  sku VARCHAR(100) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- ADDRESSES
-- ================================================

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) DEFAULT 'home', -- home, office, other
  recipient_name VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255), -- Ward, District
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- CART & WISHLIST
-- ================================================

-- Shopping cart
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id, variant_id)
);

-- Wishlist/Favorites
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ================================================
-- ORDERS & PAYMENTS
-- ================================================

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id),
  
  -- Shipping info
  shipping_address_id UUID REFERENCES addresses(id),
  recipient_name VARCHAR(200),
  phone VARCHAR(20),
  shipping_address TEXT,
  
  -- Pricing
  subtotal DECIMAL(12, 2) NOT NULL,
  shipping_cost DECIMAL(12, 2) DEFAULT 0,
  discount_amount DECIMAL(12, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) NOT NULL,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipping', 'delivered', 'cancelled', 'refunded')),
  payment_method VARCHAR(50) CHECK (payment_method IN ('cod', 'qr', 'card')),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  
  -- Notes
  note TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  
  -- Snapshot data (in case product is deleted/changed)
  product_name VARCHAR(255) NOT NULL,
  product_image TEXT,
  size VARCHAR(10),
  color VARCHAR(50),
  
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(12, 2) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- REVIEWS & RATINGS
-- ================================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, product_id, order_id)
);

-- ================================================
-- DISCOUNT CODES & PROMOTIONS
-- ================================================

CREATE TABLE discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value DECIMAL(12, 2) NOT NULL,
  min_order_amount DECIMAL(12, 2) DEFAULT 0,
  max_discount_amount DECIMAL(12, 2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discount code usage tracking
CREATE TABLE discount_code_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discount_code_id UUID REFERENCES discount_codes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  discount_amount DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, discount_code_id, order_id)
);

-- ================================================
-- STORES & LOCATIONS
-- ================================================

CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  province VARCHAR(100),
  district VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  opening_hours TEXT,
  google_maps_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- INDEXES FOR PERFORMANCE
-- ================================================

-- Products
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_rating ON products(rating DESC);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- Categories
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Orders
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_number ON orders(order_number);

-- Reviews
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Addresses
CREATE INDEX idx_addresses_user ON addresses(user_id);
CREATE INDEX idx_addresses_default ON addresses(is_default);

-- Cart & Wishlist
CREATE INDEX idx_cart_user ON cart_items(user_id);
CREATE INDEX idx_wishlist_user ON wishlist(user_id);

-- ================================================
-- FUNCTIONS & TRIGGERS
-- ================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update product rating when review is added/updated/deleted
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET 
    rating = (SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) AND is_approved = true),
    review_count = (SELECT COUNT(*) FROM reviews WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) AND is_approved = true)
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_product_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Update user total_spent and membership tier
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
DECLARE
  user_total DECIMAL(12, 2);
  new_tier VARCHAR(20);
BEGIN
  -- Calculate total spent
  SELECT COALESCE(SUM(total_amount), 0) INTO user_total
  FROM orders
  WHERE user_id = NEW.user_id AND status = 'delivered';
  
  -- Determine membership tier
  IF user_total >= 5000000 THEN
    new_tier := 'PLATINUM';
  ELSIF user_total >= 3000000 THEN
    new_tier := 'GOLD';
  ELSIF user_total >= 1000000 THEN
    new_tier := 'SILVER';
  ELSE
    new_tier := 'BRONZE';
  END IF;
  
  -- Update profile
  UPDATE profiles
  SET 
    total_spent = user_total,
    membership_tier = new_tier
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_stats
AFTER UPDATE OF status ON orders
FOR EACH ROW
WHEN (NEW.status = 'delivered' AND OLD.status != 'delivered')
EXECUTE FUNCTION update_user_stats();

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only view and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Addresses: Users can manage their own addresses
CREATE POLICY "Users can view own addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);

-- Cart: Users can manage their own cart
CREATE POLICY "Users can view own cart" ON cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to own cart" ON cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart" ON cart_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from own cart" ON cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- Wishlist: Users can manage their own wishlist
CREATE POLICY "Users can view own wishlist" ON wishlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist" ON wishlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own wishlist" ON wishlist
  FOR DELETE USING (auth.uid() = user_id);

-- Orders: Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: Users can view items of their own orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Reviews: Users can view all approved reviews, manage their own
CREATE POLICY "Anyone can view approved reviews" ON reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can insert own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Public read access for products, categories, stores
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active categories" ON categories
  FOR SELECT USING (is_active = true);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product images" ON product_images
  FOR SELECT USING (true);

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product variants" ON product_variants
  FOR SELECT USING (true);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active stores" ON stores
  FOR SELECT USING (is_active = true);

-- ================================================
-- SAMPLE DATA
-- ================================================

-- Categories
INSERT INTO categories (name, slug, description) VALUES
  ('Áo Thun', 'ao-thun', 'Áo thun nam nữ các loại'),
  ('Áo Polo', 'ao-polo', 'Áo polo cổ bẻ'),
  ('Áo Sơ Mi', 'ao-so-mi', 'Áo sơ mi công sở, casual'),
  ('Quần Jeans', 'quan-jeans', 'Quần jeans nam nữ'),
  ('Quần Short', 'quan-short', 'Quần short thể thao, casual'),
  ('Phụ Kiện', 'phu-kien', 'Phụ kiện thời trang');

-- Sample discount codes
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount, usage_limit, valid_until) VALUES
  ('WELCOME20', 'Giảm 20% cho đơn hàng đầu tiên', 'percentage', 20, 500000, 1000, NOW() + INTERVAL '30 days'),
  ('SUMMER50K', 'Giảm 50.000đ cho đơn từ 1 triệu', 'fixed_amount', 50000, 1000000, NULL, NOW() + INTERVAL '60 days'),
  ('VIP15', 'Giảm 15% cho thành viên VIP', 'percentage', 15, 0, NULL, NOW() + INTERVAL '90 days');

-- Sample stores
INSERT INTO stores (name, address, province, district, phone, opening_hours, is_active) VALUES
  ('Clothify - Quận 1', '123 Nguyễn Huệ, Phường Bến Nghé', 'TP. Hồ Chí Minh', 'Quận 1', '0901234567', '9:00 - 21:00', true),
  ('Clothify - Hà Nội', '456 Hoàn Kiếm', 'Hà Nội', 'Hoàn Kiếm', '0901234568', '9:00 - 21:00', true),
  ('Clothify - Đà Nẵng', '789 Hải Châu', 'Đà Nẵng', 'Hải Châu', '0901234569', '9:00 - 21:00', true);

-- ================================================
-- VIEWS FOR COMMON QUERIES
-- ================================================

-- Product details with category info
CREATE OR REPLACE VIEW product_details AS
SELECT 
  p.*,
  c.name as category_name,
  c.slug as category_slug,
  (SELECT json_agg(json_build_object('id', pi.id, 'url', pi.image_url, 'is_primary', pi.is_primary) ORDER BY pi.display_order)
   FROM product_images pi WHERE pi.product_id = p.id) as images,
  (SELECT json_agg(json_build_object('id', pv.id, 'size', pv.size, 'color', pv.color, 'stock', pv.stock_quantity))
   FROM product_variants pv WHERE pv.product_id = p.id) as variants
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- Order summary view
CREATE OR REPLACE VIEW order_summary AS
SELECT 
  o.*,
  COUNT(oi.id) as item_count,
  json_agg(
    json_build_object(
      'product_name', oi.product_name,
      'quantity', oi.quantity,
      'unit_price', oi.unit_price,
      'total_price', oi.total_price
    )
  ) as items
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;

-- ================================================
-- COMPLETION MESSAGE
-- ================================================

COMMENT ON SCHEMA public IS 'Clothify E-Commerce Database Schema - Ready for Supabase!';

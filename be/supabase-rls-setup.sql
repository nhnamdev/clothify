-- ========================================
-- Supabase Database Setup for Clothify
-- ========================================
-- Run this SQL in Supabase SQL Editor to:
-- 1. Enable RLS (Row Level Security)
-- 2. Create trigger to auto-create profile when user signs up
-- 3. Create policies for user access control

-- ========================================
-- 1. AUTO-CREATE PROFILE ON USER SIGNUP
-- ========================================

-- Function: Tạo profile mới trong bảng public.profiles khi user đăng ký qua Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name, 
    last_name,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Gọi function khi có user mới trong auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================

-- Enable RLS cho các bảng cần bảo mật
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 3. RLS POLICIES - PROFILES
-- ========================================

-- Policy: User chỉ xem được profile của chính mình
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: User chỉ update được profile của chính mình
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Cho phép Spring Boot backend read all profiles (nếu dùng service_role key)
DROP POLICY IF EXISTS "Service role can access all profiles" ON public.profiles;
CREATE POLICY "Service role can access all profiles"
  ON public.profiles
  FOR ALL
  USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

-- ========================================
-- 4. RLS POLICIES - CART ITEMS
-- ========================================

-- Policy: User chỉ xem cart items của mình
DROP POLICY IF EXISTS "Users can view own cart items" ON public.cart_items;
CREATE POLICY "Users can view own cart items"
  ON public.cart_items
  FOR SELECT
  USING (user_id = auth.uid());

-- Policy: User chỉ thêm cart items cho mình
DROP POLICY IF EXISTS "Users can insert own cart items" ON public.cart_items;
CREATE POLICY "Users can insert own cart items"
  ON public.cart_items
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Policy: User chỉ update cart items của mình
DROP POLICY IF EXISTS "Users can update own cart items" ON public.cart_items;
CREATE POLICY "Users can update own cart items"
  ON public.cart_items
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policy: User chỉ delete cart items của mình
DROP POLICY IF EXISTS "Users can delete own cart items" ON public.cart_items;
CREATE POLICY "Users can delete own cart items"
  ON public.cart_items
  FOR DELETE
  USING (user_id = auth.uid());

-- ========================================
-- 5. RLS POLICIES - ORDERS
-- ========================================

-- Policy: User chỉ xem orders của mình
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders"
  ON public.orders
  FOR SELECT
  USING (user_id = auth.uid());

-- Policy: User chỉ tạo orders cho mình
DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders;
CREATE POLICY "Users can insert own orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Policy: User chỉ update orders của mình (cancel order, etc.)
DROP POLICY IF EXISTS "Users can update own orders" ON public.orders;
CREATE POLICY "Users can update own orders"
  ON public.orders
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ========================================
-- 6. RLS POLICIES - WISHLISTS
-- ========================================

DROP POLICY IF EXISTS "Users can manage own wishlists" ON public.wishlists;
CREATE POLICY "Users can manage own wishlists"
  ON public.wishlists
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ========================================
-- 7. RLS POLICIES - ADDRESSES
-- ========================================

DROP POLICY IF EXISTS "Users can manage own addresses" ON public.addresses;
CREATE POLICY "Users can manage own addresses"
  ON public.addresses
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ========================================
-- 8. PUBLIC ACCESS POLICIES
-- ========================================

-- Products: Ai cũng có thể xem
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products"
  ON public.products
  FOR SELECT
  USING (true);

-- Categories: Ai cũng có thể xem
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories"
  ON public.categories
  FOR SELECT
  USING (true);

-- Reviews: Ai cũng có thể xem
DROP POLICY IF EXISTS "Public can view reviews" ON public.reviews;
CREATE POLICY "Public can view reviews"
  ON public.reviews
  FOR SELECT
  USING (true);

-- Reviews: User phải login mới tạo review được
DROP POLICY IF EXISTS "Authenticated users can create reviews" ON public.reviews;
CREATE POLICY "Authenticated users can create reviews"
  ON public.reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 9. HELPER FUNCTIONS
-- ========================================

-- Function: Check if user owns a resource
CREATE OR REPLACE FUNCTION public.is_owner(resource_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.uid() = resource_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Get current user email
CREATE OR REPLACE FUNCTION public.current_user_email()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT email FROM auth.users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 10. TEST QUERIES
-- ========================================

-- Test 1: Kiểm tra trigger đã hoạt động chưa
-- SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Test 2: Kiểm tra policies
-- SELECT * FROM pg_policies WHERE schemaname = 'public' AND tablename = 'profiles';

-- Test 3: Kiểm tra profile có tạo khi signup không
-- SELECT * FROM public.profiles ORDER BY created_at DESC LIMIT 5;

-- ========================================
-- DONE! 🎉
-- ========================================
-- Sau khi chạy script này:
-- 1. User signup qua Supabase → Tự động tạo profile
-- 2. RLS đã enable → User chỉ access được data của mình
-- 3. Spring Boot backend có thể bypass RLS với service_role key
-- 
-- Next steps:
-- - Copy JWT Secret từ Supabase Dashboard vào application.yml
-- - Test signup/login từ frontend
-- - Verify profile được tạo tự động

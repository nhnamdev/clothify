-- Sample data for testing Clothify backend

-- Insert sample categories
INSERT INTO categories (id, name, slug, description, parent_id, display_order, is_active)
VALUES
    (gen_random_uuid(), 'Áo', 'ao', 'Các loại áo thời trang', NULL, 1, true),
    (gen_random_uuid(), 'Quần', 'quan', 'Các loại quần thời trang', NULL, 2, true),
    (gen_random_uuid(), 'Giày', 'giay', 'Giày dép thời trang', NULL, 3, true)
ON CONFLICT DO NOTHING;

-- Get category IDs
DO $$
DECLARE
    ao_id UUID;
    quan_id UUID;
    giay_id UUID;
    product1_id UUID;
    product2_id UUID;
    product3_id UUID;
    variant1_id UUID;
    variant2_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO ao_id FROM categories WHERE slug = 'ao' LIMIT 1;
    SELECT id INTO quan_id FROM categories WHERE slug = 'quan' LIMIT 1;
    SELECT id INTO giay_id FROM categories WHERE slug = 'giay' LIMIT 1;

    -- Insert sample products
    INSERT INTO products (id, name, slug, description, category_id, price, original_price, discount_percent, sku, stock_quantity, is_new, is_featured, is_active)
    VALUES
        (gen_random_uuid(), 'Áo Thun One Life Graphic', 'ao-thun-one-life', 'Áo thun cotton 100% cao cấp với họa tiết One Life độc đáo', ao_id, 260000, 300000, 13.33, 'AT-001', 100, true, true, true),
        (gen_random_uuid(), 'Áo Polo Sọc Ngang', 'ao-polo-soc-ngang', 'Áo polo phong cách với sọc ngang hiện đại', ao_id, 350000, 400000, 12.50, 'AP-001', 50, false, true, true),
        (gen_random_uuid(), 'Quần Jeans Skinny Fit', 'quan-jeans-skinny', 'Quần jeans ôm body chất liệu co giãn thoải mái', quan_id, 450000, 550000, 18.18, 'QJ-001', 75, true, false, true)
    RETURNING id INTO product1_id;

    SELECT id INTO product1_id FROM products WHERE slug = 'ao-thun-one-life' LIMIT 1;
    SELECT id INTO product2_id FROM products WHERE slug = 'ao-polo-soc-ngang' LIMIT 1;
    SELECT id INTO product3_id FROM products WHERE slug = 'quan-jeans-skinny' LIMIT 1;

    -- Insert product images
    INSERT INTO product_images (product_id, image_url, display_order, is_primary)
    VALUES
        (product1_id, 'https://placehold.co/600x800/4F46E5/white?text=Ao+Thun+1', 0, true),
        (product1_id, 'https://placehold.co/600x800/4F46E5/white?text=Ao+Thun+2', 1, false),
        (product2_id, 'https://placehold.co/600x800/059669/white?text=Ao+Polo+1', 0, true),
        (product2_id, 'https://placehold.co/600x800/059669/white?text=Ao+Polo+2', 1, false),
        (product3_id, 'https://placehold.co/600x800/DC2626/white?text=Quan+Jeans+1', 0, true),
        (product3_id, 'https://placehold.co/600x800/DC2626/white?text=Quan+Jeans+2', 1, false);

    -- Insert product variants (sizes)
    INSERT INTO product_variants (product_id, size, color, stock_quantity)
    VALUES
        (product1_id, 'S', NULL, 20),
        (product1_id, 'M', NULL, 30),
        (product1_id, 'L', NULL, 25),
        (product1_id, 'XL', NULL, 25),
        (product2_id, 'S', NULL, 10),
        (product2_id, 'M', NULL, 15),
        (product2_id, 'L', NULL, 15),
        (product2_id, 'XL', NULL, 10),
        (product3_id, '29', NULL, 15),
        (product3_id, '30', NULL, 20),
        (product3_id, '31', NULL, 20),
        (product3_id, '32', NULL, 20);

    -- Insert sample reviews
    -- First, we need a test user profile
    -- Note: This assumes you have created a user via Supabase Auth first
    -- If not, you'll need to create the profile manually

    -- Insert sample discount codes
    INSERT INTO discount_codes (code, description, type, value, min_purchase_amount, max_discount_amount, usage_limit, valid_from, valid_until, is_active)
    VALUES
        ('SUMMER2026', 'Giảm 50K cho đơn hàng từ 500K', 'fixed_amount', 50000, 500000, NULL, 100, NOW(), NOW() + INTERVAL '30 days', true),
        ('NEWUSER', 'Giảm 10% cho khách hàng mới', 'percentage', 10, 300000, 100000, 50, NOW(), NOW() + INTERVAL '60 days', true),
        ('VIP20', 'Giảm 20% cho thành viên VIP', 'percentage', 20, 1000000, 200000, NULL, NOW(), NOW() + INTERVAL '90 days', true)
    ON CONFLICT (code) DO NOTHING;

    -- Insert sample stores
    INSERT INTO stores (name, address, ward, district, city, phone, email, latitude, longitude, opening_hours, is_active)
    VALUES
        ('Clothify Quận 1', '123 Nguyễn Huệ', 'Bến Nghé', 'Quận 1', 'TP. Hồ Chí Minh', '0281234567', 'q1@clothify.vn', 10.7743, 106.7011, 'T2-CN: 9:00 - 21:00', true),
        ('Clothify Quận 3', '456 Võ Văn Tần', 'Võ Thị Sáu', 'Quận 3', 'TP. Hồ Chí Minh', '0281234568', 'q3@clothify.vn', 10.7787, 106.6914, 'T2-CN: 9:00 - 21:00', true),
        ('Clothify Hà Nội', '789 Hoàn Kiếm', 'Hàng Bạc', 'Quận Hoàn Kiếm', 'Hà Nội', '0241234567', 'hn@clothify.vn', 21.0285, 105.8542, 'T2-CN: 9:00 - 21:00', true)
    ON CONFLICT DO NOTHING;

END $$;

-- Verify data
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Product Images', COUNT(*) FROM product_images
UNION ALL
SELECT 'Product Variants', COUNT(*) FROM product_variants
UNION ALL
SELECT 'Discount Codes', COUNT(*) FROM discount_codes
UNION ALL
SELECT 'Stores', COUNT(*) FROM stores;

-- Show sample products
SELECT 
    p.name,
    p.slug,
    p.price,
    c.name as category,
    p.stock_quantity,
    p.is_new,
    p.is_featured
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
ORDER BY p.created_at DESC;

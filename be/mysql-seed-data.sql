-- Clothify Sample Data
-- Insert sample users (password is "password123" hashed with BCrypt)
INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES
('admin@clothify.com', '$2a$10$eXZNXrNpq.7cKJZC3LQZOuJxNmW3F7qY3qLkZnW3F7qY3qLkZnW3F', 'Admin', 'User', '0901234567'),
('user1@example.com', '$2a$10$eXZNXrNpq.7cKJZC3LQZOuJxNmW3F7qY3qLkZnW3F7qY3qLkZnW3F', 'Nguyen', 'Van A', '0912345678'),
('user2@example.com', '$2a$10$eXZNXrNpq.7cKJZC3LQZOuJxNmW3F7qY3qLkZnW3F7qY3qLkZnW3F', 'Tran', 'Thi B', '0923456789');

-- Insert profiles (linked 1:1 with users using same IDs)
INSERT INTO profiles (id, first_name, last_name, email, phone, total_spent, membership_tier, points) VALUES
(1, 'Admin', 'User', 'admin@clothify.com', '0901234567', 0, 'PLATINUM', 1000),
(2, 'Nguyen', 'Van A', 'user1@example.com', '0912345678', 0, 'BRONZE', 0),
(3, 'Tran', 'Thi B', 'user2@example.com', '0923456789', 0, 'BRONZE', 0);

-- Insert categories
INSERT INTO categories (name, slug, description, display_order, is_active) VALUES
('Áo Nam', 'ao-nam', 'Thời trang áo dành cho nam giới', 1, TRUE),
('Áo Nữ', 'ao-nu', 'Thời trang áo dành cho nữ giới', 2, TRUE),
('Quần Nam', 'quan-nam', 'Thời trang quần dành cho nam giới', 3, TRUE),
('Quần Nữ', 'quan-nu', 'Thời trang quần dành cho nữ giới', 4, TRUE),
('Phụ Kiện', 'phu-kien', 'Phụ kiện thời trang', 5, TRUE);

-- Insert subcategories
INSERT INTO categories (name, slug, description, parent_id, display_order, is_active) VALUES
('Áo Thun Nam', 'ao-thun-nam', 'Áo thun basic cho nam', 1, 1, TRUE),
('Áo Polo Nam', 'ao-polo-nam', 'Áo polo lịch sự cho nam', 1, 2, TRUE),
('Áo Sơ Mi Nam', 'ao-so-mi-nam', 'Áo sơ mi công sở', 1, 3, TRUE),
('Áo Thun Nữ', 'ao-thun-nu', 'Áo thun nữ nhiều kiểu dáng', 2, 1, TRUE),
('Áo Kiểu Nữ', 'ao-kieu-nu', 'Áo kiểu thời trang nữ', 2, 2, TRUE);

-- Insert products
INSERT INTO products (name, slug, description, brand, category_id, base_price, is_active, featured) VALUES
('Áo Thun Nam Basic Trắng', 'ao-thun-nam-basic-trang', 'Áo thun nam form regular, chất liệu cotton 100%', 'Clothify', 6, 150000, TRUE, TRUE),
('Áo Thun Nam Basic Đen', 'ao-thun-nam-basic-den', 'Áo thun nam form regular, chất liệu cotton 100%', 'Clothify', 6, 150000, TRUE, TRUE),
('Áo Polo Nam Trơn', 'ao-polo-nam-tron', 'Áo polo nam cao cấp, form slim fit', 'Clothify', 7, 250000, TRUE, TRUE),
('Áo Sơ Mi Nam Trắng', 'ao-so-mi-nam-trang', 'Áo sơ mi nam công sở, chất liệu kate cao cấp', 'Clothify', 8, 350000, TRUE, FALSE),
('Áo Sơ Mi Nam Xanh Navy', 'ao-so-mi-nam-xanh-navy', 'Áo sơ mi nam công sở, chất liệu kate cao cấp', 'Clothify', 8, 350000, TRUE, FALSE),
('Áo Thun Nữ Form Rộng', 'ao-thun-nu-form-rong', 'Áo thun nữ oversized, cotton mềm mại', 'Clothify', 9, 180000, TRUE, TRUE),
('Áo Kiểu Nữ Hoa Nhí', 'ao-kieu-nu-hoa-nhi', 'Áo kiểu nữ vintage, họa tiết hoa nhí xinh xắn', 'Clothify', 10, 280000, TRUE, TRUE),
('Quần Jeans Nam Slim Fit', 'quan-jeans-nam-slim-fit', 'Quần jeans nam form slim, chất liệu denim cao cấp', 'Clothify', 3, 450000, TRUE, FALSE),
('Quần Jeans Nữ Ống Rộng', 'quan-jeans-nu-ong-rong', 'Quần jeans nữ wide leg, phong cách retro', 'Clothify', 4, 480000, TRUE, TRUE),
('Mũ Lưỡi Trai Unisex', 'mu-luoi-trai-unisex', 'Mũ lưỡi trai basic, chất liệu kaki', 'Clothify', 5, 120000, TRUE, FALSE);

-- Insert product variants for Áo Thun Nam Basic Trắng
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(1, 'ATN-TRANG-S', 'S', 'Trắng', 150000, 50, TRUE),
(1, 'ATN-TRANG-M', 'M', 'Trắng', 150000, 100, TRUE),
(1, 'ATN-TRANG-L', 'L', 'Trắng', 150000, 80, TRUE),
(1, 'ATN-TRANG-XL', 'XL', 'Trắng', 150000, 60, TRUE);

-- Insert product variants for Áo Thun Nam Basic Đen
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(2, 'ATN-DEN-S', 'S', 'Đen', 150000, 45, TRUE),
(2, 'ATN-DEN-M', 'M', 'Đen', 150000, 90, TRUE),
(2, 'ATN-DEN-L', 'L', 'Đen', 150000, 75, TRUE),
(2, 'ATN-DEN-XL', 'XL', 'Đen', 150000, 55, TRUE);

-- Insert product variants for Áo Polo Nam
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(3, 'POLO-XANHDUONG-M', 'M', 'Xanh Dương', 250000, 40, TRUE),
(3, 'POLO-XANHDUONG-L', 'L', 'Xanh Dương', 250000, 35, TRUE),
(3, 'POLO-DEN-M', 'M', 'Đen', 250000, 30, TRUE),
(3, 'POLO-DEN-L', 'L', 'Đen', 250000, 28, TRUE);

-- Insert product variants for Áo Sơ Mi Nam Trắng
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(4, 'SM-TRANG-M', 'M', 'Trắng', 350000, 25, TRUE),
(4, 'SM-TRANG-L', 'L', 'Trắng', 350000, 30, TRUE),
(4, 'SM-TRANG-XL', 'XL', 'Trắng', 350000, 20, TRUE);

-- Insert product variants for Áo Sơ Mi Nam Xanh Navy
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(5, 'SM-NAVY-M', 'M', 'Xanh Navy', 350000, 22, TRUE),
(5, 'SM-NAVY-L', 'L', 'Xanh Navy', 350000, 28, TRUE),
(5, 'SM-NAVY-XL', 'XL', 'Xanh Navy', 350000, 18, TRUE);

-- Insert product variants for Áo Thun Nữ Form Rộng
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(6, 'ATNU-TRANG-M', 'M', 'Trắng', 180000, 60, TRUE),
(6, 'ATNU-TRANG-L', 'L', 'Trắng', 180000, 55, TRUE),
(6, 'ATNU-HONG-M', 'M', 'Hồng', 180000, 45, TRUE),
(6, 'ATNU-HONG-L', 'L', 'Hồng', 180000, 40, TRUE);

-- Insert product variants for Áo Kiểu Nữ Hoa Nhí
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(7, 'AKNU-HOANI-M', 'M', 'Hoa Nhí', 280000, 35, TRUE),
(7, 'AKNU-HOANI-L', 'L', 'Hoa Nhí', 280000, 30, TRUE);

-- Insert product variants for Quần Jeans Nam
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(8, 'JEANS-NAM-30', '30', 'Blue Wash', 450000, 25, TRUE),
(8, 'JEANS-NAM-32', '32', 'Blue Wash', 450000, 30, TRUE),
(8, 'JEANS-NAM-34', '34', 'Blue Wash', 450000, 22, TRUE);

-- Insert product variants for Quần Jeans Nữ
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(9, 'JEANS-NU-27', '27', 'Light Blue', 480000, 28, TRUE),
(9, 'JEANS-NU-29', '29', 'Light Blue', 480000, 32, TRUE),
(9, 'JEANS-NU-31', '31', 'Light Blue', 480000, 24, TRUE);

-- Insert product variants for Mũ Lưỡi Trai
INSERT INTO product_variants (product_id, sku, size, color, price, stock_quantity, is_available) VALUES
(10, 'MU-DEN-FREESIZE', 'Free', 'Đen', 120000, 100, TRUE),
(10, 'MU-NAU-FREESIZE', 'Free', 'Nâu', 120000, 80, TRUE),
(10, 'MU-XANHREU-FREESIZE', 'Free', 'Xanh Rêu', 120000, 70, TRUE);

-- Insert product images (using placeholder URLs)
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order) VALUES
(1, 'https://via.placeholder.com/500x600/FFFFFF/000000?text=Ao+Thun+Trang', 'Áo Thun Nam Basic Trắng', TRUE, 1),
(1, 'https://via.placeholder.com/500x600/FFFFFF/333333?text=Ao+Thun+Trang+2', 'Áo Thun Nam Basic Trắng - Mặt sau', FALSE, 2),
(2, 'https://via.placeholder.com/500x600/000000/FFFFFF?text=Ao+Thun+Den', 'Áo Thun Nam Basic Đen', TRUE, 1),
(2, 'https://via.placeholder.com/500x600/222222/FFFFFF?text=Ao+Thun+Den+2', 'Áo Thun Nam Basic Đen - Mặt sau', FALSE, 2),
(3, 'https://via.placeholder.com/500x600/1E90FF/FFFFFF?text=Ao+Polo', 'Áo Polo Nam Trơn', TRUE, 1),
(4, 'https://via.placeholder.com/500x600/F8F8F8/000000?text=Ao+So+Mi+Trang', 'Áo Sơ Mi Nam Trắng', TRUE, 1),
(5, 'https://via.placeholder.com/500x600/000080/FFFFFF?text=Ao+So+Mi+Navy', 'Áo Sơ Mi Nam Xanh Navy', TRUE, 1),
(6, 'https://via.placeholder.com/500x600/FFE4E1/000000?text=Ao+Thun+Nu', 'Áo Thun Nữ Form Rộng', TRUE, 1),
(7, 'https://via.placeholder.com/500x600/FFC0CB/000000?text=Ao+Kieu+Hoa+Nhi', 'Áo Kiểu Nữ Hoa Nhí', TRUE, 1),
(8, 'https://via.placeholder.com/500x600/4169E1/FFFFFF?text=Quan+Jeans+Nam', 'Quần Jeans Nam Slim Fit', TRUE, 1),
(9, 'https://via.placeholder.com/500x600/87CEEB/000000?text=Quan+Jeans+Nu', 'Quần Jeans Nữ Ống Rộng', TRUE, 1),
(10, 'https://via.placeholder.com/500x600/2F4F4F/FFFFFF?text=Mu+Luoi+Trai', 'Mũ Lưỡi Trai Unisex', TRUE, 1);

-- Insert sample addresses (linked to profiles, not users)
INSERT INTO addresses (user_id, recipient_name, recipient_phone, address_line, ward, district, city, postal_code, is_default) VALUES
(2, 'Nguyen Van A', '0912345678', '123 Đường Lê Lợi', 'Phường Bến Nghé', 'Quận 1', 'Hồ Chí Minh', '700000', TRUE),
(3, 'Tran Thi B', '0923456789', '456 Đường Trần Hưng Đạo', 'Phường 1', 'Quận 5', 'Hồ Chí Minh', '700000', TRUE);

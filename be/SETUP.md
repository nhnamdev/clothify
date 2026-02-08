# 🚀 Hướng Dẫn Setup Supabase cho Clothify

## 📝 Bước 1: Cài Đặt Dependencies

```bash
cd fe
npm install @supabase/supabase-js
```

## 🗄️ Bước 2: Tạo Database Schema

### 2.1. Truy cập Supabase Dashboard
1. Đăng nhập https://app.supabase.com
2. Tạo project mới hoặc chọn project có sẵn
3. Vào **SQL Editor**

### 2.2. Chạy Schema Script
1. Mở file `be/supabase-schema.sql`
2. Copy toàn bộ nội dung
3. Paste vào SQL Editor
4. Click **RUN** hoặc nhấn `Ctrl/Cmd + Enter`

### 2.3. Verify Setup
```sql
-- Check tables created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Should return: addresses, cart_items, categories, discount_codes, 
-- order_items, orders, product_images, product_variants, products, 
-- profiles, reviews, stores, wishlist
```

## ⚙️ Bước 3: Configure Environment Variables

### 3.1. Lấy Supabase Credentials
1. Vào **Project Settings** > **API**
2. Copy:
   - **Project URL** (URL)
   - **anon/public** key (API Key)

### 3.2. Tạo .env file
```bash
# Trong thư mục fe/
cp .env.example .env
```

### 3.3. Điền thông tin vào .env
```env
VITE_SUPABASE_URL=https://xyzproject.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔐 Bước 4: Setup Authentication

### 4.1. Enable Email Auth
1. Vào **Authentication** > **Providers**
2. Enable **Email** provider
3. Configure:
   - ✅ Enable email confirmations (optional)
   - ✅ Enable email change confirmations
   - Set **Site URL**: `http://localhost:5173`

### 4.2. Configure Email Templates (Optional)
1. Vào **Authentication** > **Email Templates**
2. Customize:
   - Confirm signup
   - Magic link
   - Change email address
   - Reset password

### 4.3. Setup Auth in React
Tạo `src/contexts/AuthContext.jsx`:

```jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getCurrentUser, onAuthStateChange } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    getCurrentUser().then(setUser).catch(console.error);

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signUp: (email, password, userData) => 
      supabase.auth.signUp({ email, password, options: { data: userData } }),
    signIn: (email, password) => 
      supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
```

Wrap App với AuthProvider trong `src/main.jsx`:

```jsx
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
```

## 📦 Bước 5: Sử Dụng Supabase trong Components

### Example: Product List
```jsx
import { useEffect, useState } from 'react';
import { getProducts } from '../lib/supabase';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts({ limit: 20 });
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price.toLocaleString('vi-VN')}₫</p>
        </div>
      ))}
    </div>
  );
}
```

### Example: Add to Cart
```jsx
import { useAuth } from '../contexts/AuthContext';
import { addToCart } from '../lib/supabase';

export default function ProductDetail({ product }) {
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      // Redirect to login
      return;
    }

    try {
      await addToCart(user.id, product.id, null, 1);
      alert('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <button onClick={handleAddToCart}>
      Thêm vào giỏ hàng
    </button>
  );
}
```

### Example: User Orders
```jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserOrders } from '../lib/supabase';

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    const data = await getUserOrders(user.id);
    setOrders(data);
  };

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          <h3>{order.order_number}</h3>
          <p>Status: {order.status}</p>
          <p>Total: {order.total_amount.toLocaleString('vi-VN')}₫</p>
        </div>
      ))}
    </div>
  );
}
```

## 🔒 Bước 6: Setup Row Level Security (RLS)

RLS đã được config sẵn trong schema. Verify:

```sql
-- Check RLS enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;

-- Check policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

## 📊 Bước 7: Populate Sample Data (Optional)

### Thêm sample products:
```sql
INSERT INTO products (name, slug, description, price, stock_quantity, is_active, is_new)
VALUES 
  ('Áo Thun One Life', 'ao-thun-one-life', 'Áo thun cotton cao cấp', 260000, 100, true, true),
  ('Áo Polo Sọc', 'ao-polo-soc', 'Áo polo phong cách', 212000, 50, true, false),
  ('Quần Jeans Skinny', 'quan-jeans-skinny', 'Quần jeans ôm body', 450000, 75, true, false);
```

### Thêm product images:
```sql
INSERT INTO product_images (product_id, image_url, display_order, is_primary)
VALUES 
  ((SELECT id FROM products WHERE slug = 'ao-thun-one-life'), 'https://example.com/image1.jpg', 0, true);
```

### Thêm product variants (sizes):
```sql
INSERT INTO product_variants (product_id, size, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'ao-thun-one-life'), 'S', 20),
  ((SELECT id FROM products WHERE slug = 'ao-thun-one-life'), 'M', 30),
  ((SELECT id FROM products WHERE slug = 'ao-thun-one-life'), 'L', 25),
  ((SELECT id FROM products WHERE slug = 'ao-thun-one-life'), 'XL', 25);
```

## 🧪 Bước 8: Test Database

### Test trong Supabase Dashboard:
1. Vào **Table Editor**
2. Browse tables: products, categories, etc.
3. Insert/update/delete test data

### Test từ React app:
```bash
npm run dev
```

Open browser console và test:
```javascript
import { supabase } from './lib/supabase';

// Test get products
const { data } = await supabase.from('products').select('*');
console.log(data);

// Test auth
const { data: authData } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123'
});
console.log(authData);
```

## 🚨 Troubleshooting

### Error: "relation does not exist"
- Schema chưa được tạo → Chạy lại `supabase-schema.sql`

### Error: "JWT expired" / Auth issues
- Check API keys trong `.env`
- Verify Site URL trong Supabase Dashboard

### Error: "new row violates row-level security policy"
- User chưa authenticated
- RLS policy không cho phép operation
- Check user permissions

### Products không hiển thị
- Check `is_active = true`
- Verify có data trong DB
- Check RLS policies

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## ✅ Checklist Setup

- [ ] Install @supabase/supabase-js
- [ ] Create Supabase project
- [ ] Run schema SQL script
- [ ] Configure .env file
- [ ] Enable email authentication
- [ ] Create AuthContext
- [ ] Test database connection
- [ ] Add sample data
- [ ] Test auth flow
- [ ] Test CRUD operations

---

**Ready to build! 🎉**

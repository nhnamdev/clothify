# 🔐 Supabase Auth - Quick Setup Cheatsheet

## ⚡ Setup Nhanh (5 phút)

### 1️⃣ Supabase Database Setup

```bash
# 1. Vào Supabase Dashboard → SQL Editor
# 2. Copy toàn bộ file supabase-rls-setup.sql
# 3. Paste và Run
# 4. Check kết quả: "Success. No rows returned"
```

### 2️⃣ Lấy JWT Secret

```bash
# 1. Supabase Dashboard → Settings → API
# 2. Scroll xuống "Project JWT Settings"
# 3. Copy "JWT Secret" (dạng: super-secret-jwt-token-with-at-least-32-characters)
# 4. Paste vào application.yml:
```

```yaml
# application.yml
jwt:
  secret: <paste-jwt-secret-here>
```

### 3️⃣ Restart Backend

```bash
cd be
mvn spring-boot:run
```

### 4️⃣ Test Authentication

```bash
# Test endpoint cần auth (sẽ bị 401)
curl http://localhost:8080/api/v1/users/me/profile
# → 401 Unauthorized

# Test endpoint public (OK)
curl http://localhost:8080/api/v1/products
# → 200 OK
```

---

## 📋 File Structure

```
be/
├── src/main/java/com/clothify/
│   ├── config/
│   │   ├── SecurityConfig.java           ✅ Đã update với JWT filter
│   │   └── JwtAuthenticationFilter.java  ✅ Mới tạo - validate JWT
│   ├── service/
│   │   └── JwtService.java               ✅ Mới tạo - decode Supabase JWT
│   └── controller/
│       └── ProfileController.java        ✅ Mới tạo - example authenticated endpoint
│
├── SUPABASE-AUTH-GUIDE.md     ✅ Chi tiết workflow & implementation
├── MIGRATION-AUTH-GUIDE.md    ✅ Hướng dẫn update existing controllers
└── supabase-rls-setup.sql     ✅ SQL script setup RLS & triggers
```

---

## 🧪 Testing Flow

### Frontend: Đăng ký user mới

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
)

// Đăng ký
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123',
  options: {
    data: {
      first_name: 'Test',
      last_name: 'User'
    }
  }
})

// Lấy JWT token
const { data: { session } } = await supabase.auth.getSession()
console.log(session.access_token) // Copy token này
```

### Test với cURL

```bash
# 1. Copy JWT token từ console.log ở trên
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 2. Test endpoint cần authentication
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8080/api/v1/users/me/profile

# Response:
# {
#   "success": true,
#   "data": {
#     "id": "uuid-here",
#     "email": "test@example.com",
#     "firstName": "Test",
#     "lastName": "User",
#     ...
#   }
# }
```

### Test với Frontend

```javascript
// api.js - Axios instance
import axios from 'axios'
import { supabase } from './supabase'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})

// Auto thêm JWT token vào mỗi request
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  
  return config
})

export default api

// Usage
import api from './api'

// Lấy profile (auto include JWT token)
const { data } = await api.get('/users/me/profile')

// Lấy cart
const { data } = await api.get('/users/me/cart')

// Thêm vào cart
const { data } = await api.post('/users/me/cart/items', {
  productId: '...',
  variantId: '...',
  quantity: 1
})
```

---

## 🔑 User Authentication Endpoints

### Public (không cần JWT)

```
GET  /api/v1/products              ✅ Public
GET  /api/v1/products/{id}         ✅ Public
GET  /api/v1/categories            ✅ Public
GET  /api/v1/categories/{id}       ✅ Public
GET  /api/v1/swagger-ui.html       ✅ Public
```

### Protected (cần JWT token)

```
GET  /api/v1/users/me/profile      🔒 Auth required
PUT  /api/v1/users/me/profile      🔒 Auth required
GET  /api/v1/users/me/cart         🔒 Auth required
POST /api/v1/users/me/cart/items   🔒 Auth required
GET  /api/v1/users/me/orders       🔒 Auth required
POST /api/v1/users/me/orders       🔒 Auth required
```

---

## ❌ Common Errors & Fixes

### Error 1: "401 Unauthorized"

**Nguyên nhân:** Không gửi JWT token hoặc token không hợp lệ

**Fix:**
```javascript
// Kiểm tra token có được gửi không
const { data: { session } } = await supabase.auth.getSession()
console.log('Token:', session?.access_token)

// Kiểm tra header
console.log(api.defaults.headers)
```

### Error 2: "Profile not found"

**Nguyên nhân:** Trigger chưa chạy hoặc chưa setup

**Fix:**
```sql
-- Chạy trong Supabase SQL Editor
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Nếu không có kết quả, chạy lại supabase-rls-setup.sql
```

### Error 3: "JWT signature does not match"

**Nguyên nhân:** JWT secret không khớp

**Fix:**
```yaml
# application.yml - Đảm bảo JWT secret khớp với Supabase
jwt:
  secret: <copy-exact-từ-supabase-dashboard>
```

### Error 4: "This connection has been closed"

**Nguyên nhân:** Database connection timeout

**Fix:**
```yaml
# application.yml
spring:
  datasource:
    hikari:
      connection-timeout: 60000  # Tăng timeout
      maximum-pool-size: 10
```

---

## 🎯 Next Steps

### Immediate (Bắt buộc)

- [x] ✅ Chạy `supabase-rls-setup.sql` trong Supabase SQL Editor
- [x] ✅ Copy JWT Secret vào `application.yml`
- [x] ✅ Restart backend: `mvn spring-boot:run`
- [ ] Test authentication với cURL/Postman
- [ ] Setup frontend Supabase client

### Short-term (Nên làm)

- [ ] Update CartController sang `/users/me/cart` pattern
- [ ] Update OrderController sang `/users/me/orders` pattern
- [ ] Thêm error handling cho JWT validation
- [ ] Thêm refresh token logic (frontend)

### Long-term (Có thể làm sau)

- [ ] Implement role-based access control (admin, user)
- [ ] Add OAuth providers (Google, Facebook)
- [ ] Add audit logging
- [ ] Add rate limiting
- [ ] Setup email verification flow

---

## 📚 Documentation Links

- **Full Guide:** [SUPABASE-AUTH-GUIDE.md](SUPABASE-AUTH-GUIDE.md)
- **Migration:** [MIGRATION-AUTH-GUIDE.md](MIGRATION-AUTH-GUIDE.md)
- **Supabase Docs:** https://supabase.com/docs/guides/auth
- **Spring Security:** https://spring.io/guides/topicals/spring-security-architecture

---

## 💡 Pro Tips

1. **Development:** Disable auth cho testing
   ```java
   // SecurityConfig.java
   .requestMatchers("/users/**").permitAll() // Temporary
   ```

2. **Debug JWT:** Decode token tại https://jwt.io
   ```
   Paste token → Check "sub" claim = userId
   ```

3. **Test nhiều users:** Dùng Supabase Dashboard → Authentication → Users → Add User

4. **Frontend auto-refresh:** Supabase SDK tự động refresh token
   ```javascript
   supabase.auth.onAuthStateChange((event, session) => {
     if (event === 'TOKEN_REFRESHED') {
       console.log('Token refreshed:', session.access_token)
     }
   })
   ```

5. **Bypass RLS trong backend:** Dùng service_role key thay vì anon key
   ```yaml
   # application.yml - CHỈ dùng cho backend
   supabase:
     service-role-key: <your-service-role-key>
   ```

---

**Ready to go! 🚀**

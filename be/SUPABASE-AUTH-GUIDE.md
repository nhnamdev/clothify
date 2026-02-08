# 🔐 Supabase Authentication Integration Guide

## Kiến Trúc Hiện Tại

```
Frontend (React)
    ↓ (1) Đăng ký/Đăng nhập
Supabase Auth
    ↓ (2) Trả về JWT token
Frontend lưu token
    ↓ (3) Gọi API với Authorization: Bearer <token>
Spring Boot Backend
    ↓ (4) Validate JWT và extract userId
    ↓ (5) Xử lý business logic
Database (Supabase PostgreSQL)
```

## 📋 Các Bước Xử Lý

### 1. Frontend: Đăng ký/Đăng nhập qua Supabase

```javascript
// Frontend React - Đăng ký user mới
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
)

// Đăng ký
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      first_name: 'Nguyễn',
      last_name: 'Văn A'
    }
  }
})

// Đăng nhập
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Lấy session token
const { data: { session } } = await supabase.auth.getSession()
const accessToken = session.access_token // JWT token
```

### 2. Database: Tự động tạo Profile khi user đăng ký

**Supabase Database Trigger** (chạy trong Supabase SQL Editor):

```sql
-- Function: Tạo profile mới khi user đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Gọi function khi có user mới trong auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 3. Frontend: Gửi JWT token trong mỗi request

```javascript
// Axios interceptor - Tự động thêm token vào header
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})

// Interceptor: Thêm JWT vào Authorization header
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  
  return config
})

// Ví dụ: Gọi API get cart
const response = await api.get('/users/me/cart')  // "me" sẽ được thay bằng userId từ JWT
```

### 4. Backend: Validate JWT và Extract User ID

**❌ TRẠNG THÁI HIỆN TẠI**: Backend **CHƯA** validate JWT, nhận userId trực tiếp từ path:

```java
// CartController.java (hiện tại)
@GetMapping("/users/{userId}/cart")
public ResponseEntity<ApiResponse<CartDTO>> getCart(@PathVariable UUID userId) {
    // Không xác thực! Ai cũng có thể truy cập cart của người khác
}
```

**✅ CẦN IMPLEMENT**: JWT Filter để validate token và extract userId

## 🔧 Implementation Cần Thiết

### Bước 1: Thêm dependency JWT

```xml
<!-- pom.xml - ĐÃ CÓ SẴN -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
```

### Bước 2: Tạo JwtService để decode Supabase JWT

```java
// src/main/java/com/clothify/service/JwtService.java
package com.clothify.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    public UUID extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        String sub = claims.getSubject(); // Supabase lưu user ID trong "sub"
        return UUID.fromString(sub);
    }

    public String extractEmail(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("email", String.class);
    }

    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims extractAllClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
```

### Bước 3: Tạo JWT Authentication Filter

```java
// src/main/java/com/clothify/config/JwtAuthenticationFilter.java
package com.clothify.config;

import com.clothify.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        
        try {
            UUID userId = jwtService.extractUserId(token);
            
            // Set authentication vào SecurityContext
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(
                    userId,           // Principal = userId
                    null,             // Credentials
                    new ArrayList<>() // Authorities
                );
            
            authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
        } catch (Exception e) {
            // Token không hợp lệ, bỏ qua
        }
        
        filterChain.doFilter(request, response);
    }
}
```

### Bước 4: Cập nhật SecurityConfig

```java
// src/main/java/com/clothify/config/SecurityConfig.java
package com.clothify.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/products/**").permitAll()
                .requestMatchers("/categories/**").permitAll()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll()
                // Protected endpoints
                .requestMatchers("/users/**").authenticated()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

### Bước 5: Cập nhật Controllers để lấy userId từ Authentication

**TRƯỚC:**
```java
@GetMapping("/users/{userId}/cart")
public ResponseEntity<ApiResponse<CartDTO>> getCart(@PathVariable UUID userId) {
    // Nhận userId từ URL - không an toàn!
}
```

**SAU:**
```java
@GetMapping("/users/me/cart")
public ResponseEntity<ApiResponse<CartDTO>> getCart() {
    // Lấy userId từ JWT token đã được validate
    UUID userId = (UUID) SecurityContextHolder.getContext()
                            .getAuthentication()
                            .getPrincipal();
    
    CartDTO cart = cartService.getCart(userId);
    return ResponseEntity.ok(ApiResponse.success(cart));
}
```

Hoặc dùng **@AuthenticationPrincipal**:

```java
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@GetMapping("/users/me/cart")
public ResponseEntity<ApiResponse<CartDTO>> getCart(
    @AuthenticationPrincipal UUID userId
) {
    CartDTO cart = cartService.getCart(userId);
    return ResponseEntity.ok(ApiResponse.success(cart));
}
```

## 🎯 Workflow Hoàn Chỉnh

```
1. User đăng ký/đăng nhập → Supabase Auth
2. Supabase trả về JWT token → Frontend lưu token
3. Frontend gọi API: 
   GET /api/v1/users/me/cart
   Authorization: Bearer eyJhbGc...
   
4. Backend JwtAuthenticationFilter:
   - Extract token từ header
   - Validate token với JWT secret
   - Extract userId từ token's "sub" claim
   - Set userId vào SecurityContext
   
5. Controller:
   - Lấy userId từ SecurityContext
   - Xử lý business logic
   - Return response
```

## ⚠️ Lưu Ý Quan Trọng

### 1. JWT Secret

**Lấy JWT Secret từ Supabase:**
1. Vào Supabase Dashboard → Settings → API
2. Copy **JWT Secret** (trong Project JWT Settings)
3. Paste vào `application.yml`:

```yaml
jwt:
  secret: your-supabase-jwt-secret-here-very-long-string
```

### 2. URL Pattern Thay Đổi

**Cũ (không an toàn):**
- `GET /api/v1/users/{userId}/cart`
- `POST /api/v1/users/{userId}/orders`

**Mới (an toàn):**
- `GET /api/v1/users/me/cart`
- `POST /api/v1/users/me/orders`

### 3. Frontend Axios Config

```javascript
// api.js
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})

api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  
  return config
})

// Sử dụng
api.get('/users/me/cart')      // Thay vì /users/{userId}/cart
api.post('/users/me/orders', orderData)
```

## 🔄 Migration Plan

Nếu muốn giữ URL cũ `/users/{userId}/...`:

```java
@GetMapping("/users/{userId}/cart")
public ResponseEntity<ApiResponse<CartDTO>> getCart(
    @PathVariable UUID userId,
    @AuthenticationPrincipal UUID authenticatedUserId
) {
    // Kiểm tra userId trong URL phải khớp với userId từ JWT
    if (!userId.equals(authenticatedUserId)) {
        throw new UnauthorizedException("Cannot access other user's cart");
    }
    
    CartDTO cart = cartService.getCart(userId);
    return ResponseEntity.ok(ApiResponse.success(cart));
}
```

## 📚 Tài Liệu Tham Khảo

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase JWT Structure](https://supabase.com/docs/guides/auth/jwts)
- [Spring Security JWT](https://spring.io/guides/tutorials/spring-boot-oauth2/)

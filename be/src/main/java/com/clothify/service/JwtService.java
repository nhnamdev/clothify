package com.clothify.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

/**
 * Service để xử lý Supabase JWT tokens Supabase JWT structure: { "sub":
 * "user-uuid", // User ID "email": "user@example.com", "role": "authenticated",
 * "iat": 1234567890, "exp": 1234567890 }
 */
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    /**
     * Extract User ID từ JWT token Supabase lưu user ID trong claim "sub"
     * (subject)
     */
    public UUID extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        String sub = claims.getSubject();
        return UUID.fromString(sub);
    }

    /**
     * Extract email từ JWT token
     */
    public String extractEmail(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("email", String.class);
    }

    /**
     * Extract role từ JWT token
     */
    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class);
    }

    /**
     * Kiểm tra token có hợp lệ không
     */
    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Parse JWT token và lấy tất cả claims
     */
    private Claims extractAllClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}

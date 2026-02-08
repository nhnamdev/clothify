package com.clothify.config;

import com.clothify.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

/**
 * Filter để validate Supabase JWT token và set authentication vào
 * SecurityContext
 *
 * Flow: 1. Extract JWT token từ Authorization header 2. Validate token với
 * Supabase JWT secret 3. Extract userId từ token 4. Set userId vào
 * SecurityContext để controllers có thể access
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Lấy Authorization header
        String authHeader = request.getHeader("Authorization");

        // 2. Nếu không có token hoặc không đúng format, bỏ qua
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // 3. Extract token (bỏ "Bearer " prefix)
            String token = authHeader.substring(7);

            // 4. Extract userId từ token
            UUID userId = jwtService.extractUserId(token);

            // 5. Nếu userId hợp lệ và chưa có authentication trong context
            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // 6. Tạo authentication object
                UsernamePasswordAuthenticationToken authentication
                        = new UsernamePasswordAuthenticationToken(
                                userId, // Principal = userId (UUID)
                                null, // Credentials không cần vì đã validate JWT
                                new ArrayList<>() // Authorities (có thể thêm roles sau)
                        );

                // 7. Set request details
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 8. Set authentication vào SecurityContext
                // Controllers có thể lấy userId qua SecurityContextHolder hoặc @AuthenticationPrincipal
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        } catch (Exception e) {
            // Token không hợp lệ hoặc expired
            // Log error nếu cần debug
            // logger.error("JWT validation failed: {}", e.getMessage());
        }

        // 9. Tiếp tục filter chain
        filterChain.doFilter(request, response);
    }
}

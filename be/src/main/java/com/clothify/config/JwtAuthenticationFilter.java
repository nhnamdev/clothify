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

/**
 * Filter to validate JWT token and set authentication in SecurityContext
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

        // 1. Get Authorization header
        String authHeader = request.getHeader("Authorization");

        // 2. Skip if no token or wrong format
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // 3. Extract token (remove "Bearer " prefix)
            String token = authHeader.substring(7);

            // 4. Validate and extract userId from token
            if (jwtService.isTokenValid(token)) {
                Long userId = jwtService.extractUserId(token);

                // 5. If userId valid and no authentication in context yet
                if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    // 6. Create authentication object
                    UsernamePasswordAuthenticationToken authentication
                            = new UsernamePasswordAuthenticationToken(
                                    userId, // Principal = userId (Long)
                                    null, // Credentials not needed (JWT already validated)
                                    new ArrayList<>() // Authorities (can add roles later)
                            );

                    // 7. Set request details
                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // 8. Set authentication in SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }

        } catch (Exception e) {
            // Token invalid or expired
            // Can log error for debugging
        }

        // 9. Continue filter chain
        filterChain.doFilter(request, response);
    }
}

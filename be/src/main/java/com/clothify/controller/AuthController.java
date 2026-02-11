package com.clothify.controller;

import com.clothify.dto.ApiResponse;
import com.clothify.entity.User;
import com.clothify.service.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for authentication (register, login)
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Register a new user POST /auth/register { "email": "user@example.com",
     * "password": "password123", "firstName": "John", "lastName": "Doe" }
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponse>> register(@RequestBody RegisterRequest request) {
        try {
            User user = authService.register(
                    request.getEmail(),
                    request.getPassword(),
                    request.getFirstName(),
                    request.getLastName()
            );

            String token = authService.login(request.getEmail(), request.getPassword());

            RegisterResponse response = new RegisterResponse();
            response.setUserId(user.getId());
            response.setEmail(user.getEmail());
            response.setToken(token);

            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * Login with email and password POST /auth/login { "email":
     * "user@example.com", "password": "password123" }
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request.getEmail(), request.getPassword());
            User user = authService.getUserByEmail(request.getEmail());

            LoginResponse response = new LoginResponse();
            response.setUserId(user.getId());
            response.setEmail(user.getEmail());
            response.setToken(token);

            return ResponseEntity.ok(ApiResponse.success(response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    // Request/Response DTOs
    @Data
    public static class RegisterRequest {

        private String email;
        private String password;
        private String firstName;
        private String lastName;
    }

    @Data
    public static class LoginRequest {

        private String email;
        private String password;
    }

    @Data
    public static class RegisterResponse {

        private Long userId;
        private String email;
        private String token;
    }

    @Data
    public static class LoginResponse {

        private Long userId;
        private String email;
        private String token;
    }
}

package com.clothify.controller;

import com.clothify.dto.ApiResponse;
import com.clothify.entity.Profile;
import com.clothify.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Controller để quản lý user profile Tất cả endpoints require authentication
 * (JWT token)
 *
 * Example request: GET /api/v1/users/me/profile Authorization: Bearer
 * <supabase-jwt-token>
 */
@RestController
@RequestMapping("/users/me")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileRepository profileRepository;

    /**
     * Lấy profile của user hiện tại userId được extract từ JWT token tự động
     * bởi JwtAuthenticationFilter
     *
     * @param userId UUID của user (từ JWT token)
     * @return Profile của user
     */
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Profile>> getMyProfile(
            @AuthenticationPrincipal UUID userId
    ) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    /**
     * Cập nhật profile của user hiện tại Chỉ cho phép user update profile của
     * chính mình
     */
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<Profile>> updateMyProfile(
            @AuthenticationPrincipal UUID userId,
            @RequestBody Profile updatedProfile
    ) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Update các fields (có thể dùng ModelMapper)
        if (updatedProfile.getFirstName() != null) {
            profile.setFirstName(updatedProfile.getFirstName());
        }
        if (updatedProfile.getLastName() != null) {
            profile.setLastName(updatedProfile.getLastName());
        }
        if (updatedProfile.getPhone() != null) {
            profile.setPhone(updatedProfile.getPhone());
        }
        if (updatedProfile.getBirthday() != null) {
            profile.setBirthday(updatedProfile.getBirthday());
        }
        if (updatedProfile.getAvatar() != null) {
            profile.setAvatar(updatedProfile.getAvatar());
        }

        Profile saved = profileRepository.save(profile);
        return ResponseEntity.ok(ApiResponse.success(saved));
    }

    /**
     * Lấy ID của user hiện tại Endpoint đơn giản để test JWT authentication
     */
    @GetMapping("/id")
    public ResponseEntity<ApiResponse<String>> getMyUserId(
            @AuthenticationPrincipal UUID userId
    ) {
        return ResponseEntity.ok(
                ApiResponse.success("Your user ID: " + userId.toString())
        );
    }
}

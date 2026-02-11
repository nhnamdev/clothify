package com.clothify.controller;

import com.clothify.dto.ApiResponse;
import com.clothify.entity.Profile;
import com.clothify.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing user profiles All endpoints require authentication
 * (JWT token)
 */
@RestController
@RequestMapping("/users/me")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileRepository profileRepository;

    /**
     * Get current user's profile userId is extracted from JWT token
     * automatically by JwtAuthenticationFilter
     *
     * @param userId Long ID of user (from JWT token)
     * @return User's profile
     */
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Profile>> getMyProfile(
            @AuthenticationPrincipal Long userId
    ) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    /**
     * Update current user's profile Only allows user to update their own
     * profile
     */
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<Profile>> updateMyProfile(
            @AuthenticationPrincipal Long userId,
            @RequestBody Profile updatedProfile
    ) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Update fields
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
     * Get current user's ID Simple endpoint to test JWT authentication
     */
    @GetMapping("/id")
    public ResponseEntity<ApiResponse<String>> getMyUserId(
            @AuthenticationPrincipal Long userId
    ) {
        return ResponseEntity.ok(
                ApiResponse.success("Your user ID: " + userId)
        );
    }
}

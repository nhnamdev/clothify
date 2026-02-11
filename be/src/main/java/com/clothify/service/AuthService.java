package com.clothify.service;

import com.clothify.entity.Profile;
import com.clothify.entity.User;
import com.clothify.repository.ProfileRepository;
import com.clothify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for user authentication and registration
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Register a new user with email and password Creates both User (auth) and
     * Profile (user data) entities
     */
    @Transactional
    public User register(String email, String password, String firstName, String lastName) {
        // Check if email already exists
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }

        // Create User entity (for authentication)
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        User savedUser = userRepository.save(user);

        // Create Profile entity (for user data)
        Profile profile = new Profile();
        profile.setId(savedUser.getId()); // Same ID as User
        profile.setEmail(email);
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profileRepository.save(profile);

        // Link profile to user
        savedUser.setProfile(profile);

        return savedUser;
    }

    /**
     * Authenticate user and return JWT token
     */
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Verify password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT token
        return jwtService.generateToken(user.getId(), user.getEmail());
    }

    /**
     * Get user by ID
     */
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Get user by email
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

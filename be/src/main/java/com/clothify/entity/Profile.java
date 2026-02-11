package com.clothify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(unique = true)
    private String email;

    private String phone;

    private LocalDate birthday;

    @Column(name = "avatar_url")
    private String avatar;

    @Column(name = "total_spent", precision = 12, scale = 2, columnDefinition = "DECIMAL(12,2) DEFAULT 0")
    private BigDecimal totalSpent = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "membership_tier", columnDefinition = "VARCHAR(20) DEFAULT 'BRONZE'")
    private MembershipTier membershipTier = MembershipTier.BRONZE;

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer points = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum MembershipTier {
        BRONZE, SILVER, GOLD, PLATINUM
    }
}

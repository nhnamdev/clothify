package com.clothify.repository;

import com.clothify.entity.DiscountCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface DiscountCodeRepository extends JpaRepository<DiscountCode, Long> {

    Optional<DiscountCode> findByCode(String code);

    @Query("SELECT d FROM DiscountCode d WHERE d.code = :code AND d.isActive = true AND "
            + "(d.validFrom IS NULL OR d.validFrom <= :now) AND "
            + "(d.validUntil IS NULL OR d.validUntil >= :now) AND "
            + "(d.usageLimit IS NULL OR d.usageCount < d.usageLimit)")
    Optional<DiscountCode> findValidDiscountCode(@Param("code") String code,
            @Param("now") LocalDateTime now);
}

package com.clothify.repository;

import com.clothify.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, UUID> {

    List<CartItem> findByUserId(UUID userId);

    Optional<CartItem> findByUserIdAndProductIdAndVariantId(UUID userId, UUID productId, UUID variantId);

    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.user.id = :userId")
    void deleteByUserId(@Param("userId") UUID userId);

    @Query("SELECT COUNT(c) FROM CartItem c WHERE c.user.id = :userId")
    Long countByUserId(@Param("userId") UUID userId);
}

package com.clothify.repository;

import com.clothify.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    Optional<Category> findBySlug(String slug);

    List<Category> findByIsActiveTrue();

    List<Category> findByParentIsNullAndIsActiveTrue();

    List<Category> findByParentIdAndIsActiveTrue(UUID parentId);

    @Query("SELECT c FROM Category c WHERE c.isActive = true ORDER BY c.displayOrder ASC")
    List<Category> findAllActiveOrderByDisplayOrder();
}

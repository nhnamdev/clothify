package com.clothify.repository;

import com.clothify.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findByIsActiveTrueOrderByNameAsc();

    List<Store> findByCityAndIsActiveTrue(String city);
}

package com.clothify.service;

import com.clothify.dto.*;
import com.clothify.entity.Product;
import com.clothify.entity.ProductImage;
import com.clothify.entity.ProductVariant;
import com.clothify.repository.ProductImageRepository;
import com.clothify.repository.ProductRepository;
import com.clothify.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ModelMapper modelMapper;

    public Page<ProductDTO> getAllProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortBy));
        Page<Product> products = productRepository.findByIsActiveTrue(pageable);
        return products.map(this::convertToDTO);
    }

    public Page<ProductDTO> getProductsByCategory(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findByCategoryIdAndIsActiveTrue(categoryId, pageable);
        return products.map(this::convertToDTO);
    }

    public ProductDTO getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found: " + slug));
        return convertToDTO(product);
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        return convertToDTO(product);
    }

    public List<ProductDTO> getNewProducts() {
        List<Product> products = productRepository.findByIsNewTrueAndIsActiveTrue();
        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getFeaturedProducts() {
        List<Product> products = productRepository.findByIsFeaturedTrueAndIsActiveTrue();
        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Page<ProductDTO> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.searchProducts(keyword, pageable);
        return products.map(this::convertToDTO);
    }

    public Page<ProductDTO> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findByPriceRange(minPrice, maxPrice, pageable);
        return products.map(this::convertToDTO);
    }

    public Page<ProductDTO> getTopRatedProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findTopRatedProducts(pageable);
        return products.map(this::convertToDTO);
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = modelMapper.map(product, ProductDTO.class);

        // Load images
        List<ProductImage> images = productImageRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());
        dto.setImages(images.stream()
                .map(img -> modelMapper.map(img, ProductImageDTO.class))
                .collect(Collectors.toList()));

        // Load variants
        List<ProductVariant> variants = productVariantRepository.findByProductId(product.getId());
        dto.setVariants(variants.stream()
                .map(variant -> modelMapper.map(variant, ProductVariantDTO.class))
                .collect(Collectors.toList()));

        return dto;
    }
}

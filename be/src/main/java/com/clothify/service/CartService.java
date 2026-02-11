package com.clothify.service;

import com.clothify.dto.AddToCartRequest;
import com.clothify.dto.CartItemDTO;
import com.clothify.dto.ProductDTO;
import com.clothify.dto.ProductVariantDTO;
import com.clothify.entity.CartItem;
import com.clothify.entity.Product;
import com.clothify.entity.ProductVariant;
import com.clothify.entity.Profile;
import com.clothify.repository.CartItemRepository;
import com.clothify.repository.ProductRepository;
import com.clothify.repository.ProductVariantRepository;
import com.clothify.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProfileRepository profileRepository;
    private final ProductService productService;
    private final ModelMapper modelMapper;

    public List<CartItemDTO> getCart(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        return cartItems.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CartItemDTO addToCart(Long userId, AddToCartRequest request) {
        Profile user = profileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductVariant variant = null;
        if (request.getVariantId() != null) {
            variant = productVariantRepository.findById(request.getVariantId())
                    .orElseThrow(() -> new RuntimeException("Product variant not found"));
        }

        Long finalVariantId = variant != null ? variant.getId() : null;
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndProductIdAndVariantId(
                userId, request.getProductId(), finalVariantId);

        CartItem cartItem;
        if (existingItem.isPresent()) {
            cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        } else {
            cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setVariant(variant);
            cartItem.setQuantity(request.getQuantity());
        }

        cartItem = cartItemRepository.save(cartItem);
        return convertToDTO(cartItem);
    }

    public CartItemDTO updateCartItem(Long cartItemId, Integer quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
            return null;
        }

        cartItem.setQuantity(quantity);
        cartItem = cartItemRepository.save(cartItem);
        return convertToDTO(cartItem);
    }

    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    public Long getCartItemCount(Long userId) {
        return cartItemRepository.countByUserId(userId);
    }

    private CartItemDTO convertToDTO(CartItem cartItem) {
        CartItemDTO dto = new CartItemDTO();
        dto.setId(cartItem.getId());
        dto.setQuantity(cartItem.getQuantity());

        ProductDTO productDTO = productService.getProductById(cartItem.getProduct().getId());
        dto.setProduct(productDTO);

        if (cartItem.getVariant() != null) {
            ProductVariantDTO variantDTO = modelMapper.map(cartItem.getVariant(), ProductVariantDTO.class);
            dto.setVariant(variantDTO);
        }

        BigDecimal price = cartItem.getProduct().getPrice();
        dto.setPrice(price);
        dto.setSubtotal(price.multiply(BigDecimal.valueOf(cartItem.getQuantity())));

        return dto;
    }
}

package com.clothify.service;

import com.clothify.dto.CreateOrderItemRequest;
import com.clothify.dto.CreateOrderRequest;
import com.clothify.dto.OrderDTO;
import com.clothify.dto.OrderItemDTO;
import com.clothify.entity.*;
import com.clothify.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProfileRepository profileRepository;
    private final DiscountCodeRepository discountCodeRepository;
    private final CartItemRepository cartItemRepository;
    private final ModelMapper modelMapper;

    public OrderDTO createOrder(UUID userId, CreateOrderRequest request) {
        Profile user = profileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Calculate subtotal
        BigDecimal subtotal = BigDecimal.ZERO;
        for (CreateOrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + itemReq.getProductId()));
            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            subtotal = subtotal.add(itemTotal);
        }

        // Apply discount
        BigDecimal discountAmount = BigDecimal.ZERO;
        DiscountCode discountCode = null;
        if (request.getDiscountCode() != null && !request.getDiscountCode().isEmpty()) {
            discountCode = discountCodeRepository.findValidDiscountCode(request.getDiscountCode(), LocalDateTime.now())
                    .orElse(null);
            if (discountCode != null) {
                if (discountCode.getMinPurchaseAmount() == null || 
                    subtotal.compareTo(discountCode.getMinPurchaseAmount()) >= 0) {
                    
                    if (discountCode.getType() == DiscountCode.DiscountType.percentage) {
                        discountAmount = subtotal.multiply(discountCode.getValue()).divide(BigDecimal.valueOf(100));
                        if (discountCode.getMaxDiscountAmount() != null && 
                            discountAmount.compareTo(discountCode.getMaxDiscountAmount()) > 0) {
                            discountAmount = discountCode.getMaxDiscountAmount();
                        }
                    } else {
                        discountAmount = discountCode.getValue();
                    }
                }
            }
        }

        // Calculate total
        BigDecimal shippingAmount = BigDecimal.valueOf(50000); // Default shipping
        BigDecimal totalAmount = subtotal.add(shippingAmount).subtract(discountAmount);

        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setOrderNumber(generateOrderNumber());
        order.setShippingName(request.getShippingName());
        order.setShippingPhone(request.getShippingPhone());
        order.setShippingEmail(request.getShippingEmail());
        order.setShippingAddress(request.getShippingAddress());
        order.setShippingWard(request.getShippingWard());
        order.setShippingDistrict(request.getShippingDistrict());
        order.setShippingCity(request.getShippingCity());
        order.setShippingPostalCode(request.getShippingPostalCode());
        order.setSubtotalAmount(subtotal);
        order.setShippingAmount(shippingAmount);
        order.setDiscountAmount(discountAmount);
        order.setTotalAmount(totalAmount);
        order.setDiscountCode(discountCode);
        order.setPaymentMethod(request.getPaymentMethod());
        order.setStatus(Order.OrderStatus.pending);
        order.setPaymentStatus(Order.PaymentStatus.pending);
        order.setNotes(request.getNotes());

        order = orderRepository.save(order);

        // Create order items
        for (CreateOrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            ProductVariant variant = null;
            if (itemReq.getVariantId() != null) {
                variant = productVariantRepository.findById(itemReq.getVariantId())
                        .orElseThrow(() -> new RuntimeException("Variant not found"));
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setVariant(variant);
            orderItem.setProductName(product.getName());
            orderItem.setProductSku(product.getSku());
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setUnitPrice(product.getPrice());
            orderItem.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity())));

            if (variant != null) {
                orderItem.setVariantSize(variant.getSize());
                orderItem.setVariantColor(variant.getColor());
            }

            orderItemRepository.save(orderItem);
        }

        // Update discount code usage
        if (discountCode != null) {
            discountCode.setUsageCount(discountCode.getUsageCount() + 1);
            discountCodeRepository.save(discountCode);
        }

        // Clear cart
        cartItemRepository.deleteByUserId(userId);

        return getOrderById(order.getId());
    }

    @Transactional(readOnly = true)
    public OrderDTO getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return convertToDTO(order);
    }

    @Transactional(readOnly = true)
    public Page<OrderDTO> getUserOrders(UUID userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Order> orders = orderRepository.findByUserId(userId, pageable);
        return orders.map(this::convertToDTO);
    }

    public OrderDTO updateOrderStatus(UUID orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        if (status == Order.OrderStatus.shipping) {
            order.setShippedAt(LocalDateTime.now());
        } else if (status == Order.OrderStatus.delivered) {
            order.setDeliveredAt(LocalDateTime.now());
        } else if (status == Order.OrderStatus.cancelled) {
            order.setCancelledAt(LocalDateTime.now());
        }

        order = orderRepository.save(order);
        return convertToDTO(order);
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = modelMapper.map(order, OrderDTO.class);

        if (order.getDiscountCode() != null) {
            dto.setDiscountCode(order.getDiscountCode().getCode());
        }

        List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
        dto.setItems(items.stream()
                .map(item -> modelMapper.map(item, OrderItemDTO.class))
                .collect(Collectors.toList()));

        return dto;
    }

    private String generateOrderNumber() {
        return "CLT" + System.currentTimeMillis();
    }
}

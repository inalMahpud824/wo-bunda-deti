package com.inal.wo.service;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import com.inal.wo.entity.Order;
import com.inal.wo.entity.OrderItem;
import com.inal.wo.entity.OrderStatus;
import com.inal.wo.entity.Product;
import com.inal.wo.model.request.ChangeStatusOrderRequest;
import com.inal.wo.model.request.OrderRequest;
import com.inal.wo.model.response.ItemOrderResponse;
import com.inal.wo.model.response.OrderResponse;
import com.inal.wo.repository.OrderItemRepository;
import com.inal.wo.repository.OrderRepository;
import com.inal.wo.repository.OrderStatusRepository;
import com.inal.wo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final Clock clock;
    private static final String UPLOAD_DIR = "uploads";
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderStatusRepository orderStatusRepository;
  
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        log.info("Request create order with data {}", request);
        OrderStatus status = orderStatusRepository.findById(request.getOrderStatusId()).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status Order tidak ditemukan"));

        // Buat folder jika belum ada
        File dir = new File(UPLOAD_DIR);
        if(!dir.exists()) dir.mkdirs();

        List<Product> products = productRepository.findAllById(request.getProductId());
        if (products.size() != request.getProductId().size()) {
            // Cari ID yang hilang
            Set<Long> foundIds = products.stream()
                .map(Product::getId)
                .collect(Collectors.toSet());
            List<Long> missingIds = request.getProductId().stream()
                .filter(id -> !foundIds.contains(id))
                .toList();
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Produk tidak ditemukan: " + missingIds
            );
        }
        
        Order order = new Order();
        order.setAddress(request.getAddress());
        order.setCustomerName(request.getCustomerName());
        order.setEventDate(request.getEventDate());
        if (request.getNote() != null) {
            order.setNote(request.getNote());
        }
        order.setOrderDate(LocalDateTime.now(clock));
        order.setUpdateAt(LocalDateTime.now(clock));
        order.setPhoneNumber(request.getPhoneNumber());
        order.setStatus(status);

        // simpan gambar bukti pembayaran
        saveFile(request, order);

        // buat orderItems
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (Product prod : products) {
            totalPrice = totalPrice.add(prod.getPrice());
            OrderItem item = new OrderItem();
            item.setPriceAtOrderTime(prod.getPrice());
            item.setProduct(prod);
            item.setOrder(order);
            orderItems.add(item);
        }
        // set total price
        order.setTotalPrice(totalPrice);

        orderRepository.save(order);
        orderItemRepository.saveAll(orderItems);
        
        List<ItemOrderResponse> itemOrders = new ArrayList<>();
        for (OrderItem oi : orderItems) {
            ItemOrderResponse ior = buildItemOrderResponse(oi);
            itemOrders.add(ior);
        }
        
        return buildOrderResponse(order, itemOrders);
        
    }

    @Transactional
    public OrderResponse changeStatusOrder(ChangeStatusOrderRequest request, Long idOrder) {
        log.info("request change status order with id {} and body {}", idOrder, request);

        Order order = orderRepository.findById(idOrder).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order tidak ditemukan"));
        
        OrderStatus status = orderStatusRepository.findById(request.getOrderStatusId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status Order tidak ditemukan"));
        
        order.setStatus(status);
        order.setUpdateAt(LocalDateTime.now(clock));
        orderRepository.save(order);
        List<OrderItem> orderItems = order.getItems();
        
        List<ItemOrderResponse> itemRes = new ArrayList<>();
        for (OrderItem item : orderItems) {
            ItemOrderResponse ior = buildItemOrderResponse(item);
            itemRes.add(ior);
        }
        return buildOrderResponse(order, itemRes);
    }
    

    public List<OrderStatus> getAllOrderStatus() {
        return orderStatusRepository.findAll();
    }

    public List<OrderResponse> getAllOrders() {
        log.info("request get all orders");
        List<Order> orders = orderRepository.findAll();
        List<OrderResponse> response = new ArrayList<>();
        for (Order order : orders) {
            List<OrderItem> orderItems = order.getItems();
            List<ItemOrderResponse> ior = new ArrayList<>();
            for (OrderItem oi : orderItems) {
                ior.add(buildItemOrderResponse(oi));
            }
            OrderResponse or = buildOrderResponse(order, ior);
            response.add(or);
        }
        return response;
    }

    public OrderResponse getOrderById(Long idOrder) {
        log.info("Request get order by id {}", idOrder);

        Order order = orderRepository.findById(idOrder).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order Tidak ditemukan"));

        List<OrderItem> orderItems = order.getItems();
        List<ItemOrderResponse> orderItemsRes = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            orderItemsRes.add(buildItemOrderResponse(orderItem));
        }
        return buildOrderResponse(order, orderItemsRes);

    }
    
    private void saveFile(OrderRequest request, Order data) {
        try {
            String fileName = UUID.randomUUID() + "_" + request.getPaymentProof().getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.copy(request.getPaymentProof().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            data.setPaymentProof(fileName);
        } catch (IOException e) {
            log.error("Gagal menyimpan gambar baru", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Gagal menyimpan gambar baru");
        }
    }

    private OrderResponse buildOrderResponse (Order order, List<ItemOrderResponse> itemOrderResponses) {
        OrderResponse res = new OrderResponse();
        res.setAddress(order.getAddress());
        res.setCustomerName(order.getCustomerName());
        res.setEventDate(order.getEventDate());
        res.setId(order.getId());
        if(order.getNote() != null) {
            res.setNote(order.getNote());
        }
        res.setOrderDate(order.getOrderDate());
        res.setPaymentProof(order.getPaymentProof());
        res.setPhoneNumber(order.getPhoneNumber());
        res.setTotalPrice(order.getTotalPrice());
        res.setUpdateAt(order.getUpdateAt());
        res.setStatus(order.getStatus());
        res.setItemsOrder(itemOrderResponses);
        return res;
    }

    private ItemOrderResponse buildItemOrderResponse(OrderItem orderItem){
        ItemOrderResponse res = new ItemOrderResponse();
        res.setIdProduct(orderItem.getProduct().getId());
        res.setPriceAtOrder(orderItem.getPriceAtOrderTime());
        res.setProductName(orderItem.getProduct().getName());
        return res;
    }

}

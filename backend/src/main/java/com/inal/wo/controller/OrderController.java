package com.inal.wo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inal.wo.model.request.ChangeStatusOrderRequest;
import com.inal.wo.model.response.OrderResponse;
import com.inal.wo.service.OrderService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
  

  @GetMapping
  public ResponseEntity<List<OrderResponse>> getAllOrder() {
      return ResponseEntity.ok(orderService.getAllOrders());
  }

  @GetMapping("/{id}")
  public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
      return ResponseEntity.ok(orderService.getOrderById(id));
  }

  @PostMapping("/status/{id}")
  public ResponseEntity<OrderResponse> changeStatusOrder(@PathVariable Long id, 
      @RequestBody ChangeStatusOrderRequest status) {
      
      return ResponseEntity.ok(orderService.changeStatusOrder(status, id));
  }  
}

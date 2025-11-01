package com.inal.wo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inal.wo.model.request.CartRequest;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.model.response.ProductResponse;
import com.inal.wo.service.CartService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @PostMapping()
    public ResponseEntity<GeneralResponse<String>> addProductToCart(@RequestBody CartRequest request) {
      return ResponseEntity.ok(cartService.addCart(request));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ProductResponse>> getProductInCartByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<GeneralResponse<String>> deleteCart(@PathVariable Long cartId) {
      return ResponseEntity.ok(cartService.deleteCart(cartId));
    }
    
    
}

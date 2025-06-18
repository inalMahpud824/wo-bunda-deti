package com.inal.wo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inal.wo.model.request.ProductRequest;
import com.inal.wo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/")
    public ResponseEntity<String> postMethodName(
        @ModelAttribute ProductRequest request) {
        
        try {
            String saved = productService.createProduct(request);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                      .body("Gagal menyimpan produk: " + e.getMessage());
        }
    }
    
  
}

package com.inal.wo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inal.wo.model.response.ProductResponse;
import com.inal.wo.service.ProductService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequiredArgsConstructor
@RequestMapping("/public")
public class PublicController {

    private final ProductService productService;
  
    @GetMapping("/product")
    public ResponseEntity<List<ProductResponse>> getAllProductActive() {
            return ResponseEntity.ok(productService.getAllProductActive());
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<ProductResponse> getProductActiveById(
            @PathVariable Long id, Authentication auth) {
            return ResponseEntity.ok(productService.getProductActiveById(id));
    }
  
  

}

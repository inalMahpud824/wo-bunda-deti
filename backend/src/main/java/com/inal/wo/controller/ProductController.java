package com.inal.wo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inal.wo.model.request.ProductRequest;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.model.response.ProductResponse;
import com.inal.wo.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
        @Valid @ModelAttribute ProductRequest request) {
            return ResponseEntity.ok(productService.createProduct(request));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProduct() {
        return ResponseEntity.ok(productService.getAllProduct());
    }

    @GetMapping("/{idProduct}")
    public ResponseEntity<ProductResponse> getByIdProduct(@PathVariable Long idProduct) {
        return ResponseEntity.ok(productService.getProductById(idProduct));
    }

    @DeleteMapping("/{idProduct}")
    public ResponseEntity<GeneralResponse<Void>> deleteProduct(@PathVariable Long idProduct) {
        return ResponseEntity.ok(productService.deleteProduct(idProduct));
    }

    @PutMapping("/{idProduct}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long idProduct,
        @Valid @ModelAttribute ProductRequest request) {
        
        return ResponseEntity.ok(productService.updateProduct(idProduct, request));
    }
    
    

}

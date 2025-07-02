package com.inal.wo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inal.wo.model.request.ProductRequest;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.model.response.ProductResponse;
import com.inal.wo.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ProductController {

    private final ProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "create product")
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

    @PutMapping(value = "/{idProduct}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long idProduct,
        @Valid @ModelAttribute ProductRequest request,
        BindingResult bindingResult) {
        
        return ResponseEntity.ok(productService.updateProduct(idProduct, request));
    }

    @PatchMapping(value = "/status/{idProduct}")
    public ResponseEntity<ProductResponse> updateStatusProduct(@PathVariable Long idProduct,
        @RequestBody Boolean status) {
        
        return ResponseEntity.ok(productService.updateStatusProduct(idProduct, status));
    }
    
    

}

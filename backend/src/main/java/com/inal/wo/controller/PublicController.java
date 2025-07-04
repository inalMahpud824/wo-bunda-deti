package com.inal.wo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inal.wo.entity.Contact;
import com.inal.wo.model.request.OrderRequest;
import com.inal.wo.model.response.OrderResponse;
import com.inal.wo.model.response.ProductResponse;
import com.inal.wo.service.ContactService;
import com.inal.wo.service.OrderService;
import com.inal.wo.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/public")
public class PublicController {

    private final ProductService productService;
    private final ContactService contactService;
    private final OrderService orderService;
  
    @GetMapping("/product")
    public ResponseEntity<List<ProductResponse>> getAllProductActive() {
            return ResponseEntity.ok(productService.getAllProductActive());
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<ProductResponse> getProductActiveById(
            @PathVariable Long id, Authentication auth) {
            return ResponseEntity.ok(productService.getProductActiveById(id));
    }

    @GetMapping("/contact")
    public ResponseEntity<List<Contact>> getAllContact() {
        return ResponseEntity.ok(contactService.getAllContact());
    }

    @PostMapping(value = "/order" ,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<OrderResponse> createOrder(
        @Valid @ModelAttribute OrderRequest request) {
        
        return ResponseEntity.ok(orderService.createOrder(request));
    }
  
  

}

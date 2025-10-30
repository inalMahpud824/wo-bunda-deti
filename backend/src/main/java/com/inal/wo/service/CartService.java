package com.inal.wo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.inal.wo.entity.Cart;
import com.inal.wo.entity.Product;
import com.inal.wo.entity.User;
import com.inal.wo.model.request.CartRequest;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.model.response.ProductResponse;
import com.inal.wo.repository.CartRepository;
import com.inal.wo.repository.ProductRepository;
import com.inal.wo.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {
  
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;

    @Transactional
    public GeneralResponse<String> addCart(CartRequest request) {
      log.info("request add product to cart with data {}", request);
      User user = userRepository.findById(request.getUserId()).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User tidak ditemukan"));

      Product product = productRepository.findById(request.getProductId()).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "product tidak ditemukan"));

      if(cartRepository.findByUserAndProduct(user, product).isPresent()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product sudah ada di keranjang");
      }
      
      Cart cart = new Cart();
      cart.setProduct(product);
      cart.setUser(user);
      cartRepository.save(cart);

      GeneralResponse<String> response = new GeneralResponse<>();
      response.setMessage("Berhasil menambahkan product"); 
      response.setStatus(201);
      return response;
    }

    public List<ProductResponse> getCartByUser(Long userId) {
      log.info("request get cart wit userId {}", userId);

      User user = userRepository.findById(userId).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User tidak ditemukan"));
      List<Cart> carts = cartRepository.findAllByUser(user);
      List<ProductResponse> response = new ArrayList<>();
      for (Cart cart : carts) {
          ProductResponse res = productService.buildProductRes(cart.getProduct());
          res.setId(cart.getId());
          response.add(res);
      }
      return response;
    }

    public GeneralResponse<String> deleteCart(Long id) {
      log.info("Request delete cart with id {}", id);

      Cart cart = cartRepository.findById(id).orElseThrow(
          () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "product tidak ditemukan"));
      cartRepository.delete(cart);
      GeneralResponse<String> response = new GeneralResponse<>();
      response.setMessage("Berhasil menghapus");
      response.setStatus(200);
      return response;
    }

}

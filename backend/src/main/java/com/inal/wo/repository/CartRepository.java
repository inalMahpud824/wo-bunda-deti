package com.inal.wo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inal.wo.entity.Cart;
import com.inal.wo.entity.Product;
import com.inal.wo.entity.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
  Optional<Cart> findByUserAndProduct(User user, Product product);

  List<Cart> findAllByUser(User user);
}

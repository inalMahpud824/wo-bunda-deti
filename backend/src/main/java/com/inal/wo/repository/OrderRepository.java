package com.inal.wo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inal.wo.entity.Order;
import com.inal.wo.entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findAllByOrderByOrderDateDesc();

  List<Order> findAllByUser(User user);
  
}

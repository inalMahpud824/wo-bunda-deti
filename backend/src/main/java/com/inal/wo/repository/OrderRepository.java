package com.inal.wo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inal.wo.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findAllByOrderByOrderDateDesc();
  
}

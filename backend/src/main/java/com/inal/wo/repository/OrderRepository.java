package com.inal.wo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inal.wo.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

  
}

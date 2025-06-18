package com.inal.wo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.inal.wo.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}

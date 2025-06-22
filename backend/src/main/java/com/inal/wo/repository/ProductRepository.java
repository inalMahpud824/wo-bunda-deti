package com.inal.wo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.inal.wo.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  List<Product> findAllByActiveStatus(Boolean status);

  Optional<Product> findByIdAndActiveStatus(Long id, Boolean status);

}

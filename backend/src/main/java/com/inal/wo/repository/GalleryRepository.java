package com.inal.wo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inal.wo.entity.Gallery;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {
  
}

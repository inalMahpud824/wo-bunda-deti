package com.inal.wo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inal.wo.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

  
} 

package com.inal.wo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inal.wo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByUsername(String username);



}

package com.inal.wo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inal.wo.entity.User;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user")
    public ResponseEntity<?> getUser(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return ResponseEntity.ok(user);
    }
}

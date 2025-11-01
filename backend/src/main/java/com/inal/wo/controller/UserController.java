package com.inal.wo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inal.wo.entity.User;
import com.inal.wo.model.request.UserUpdateRequest;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @GetMapping("/user")
    public ResponseEntity<?> getUser(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user")
    public ResponseEntity<GeneralResponse<String>> 
        updateProfileUser(@RequestBody UserUpdateRequest request) {
        
        return ResponseEntity.ok(userService.updateProfile(request));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
    
}

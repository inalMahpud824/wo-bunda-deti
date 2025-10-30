package com.inal.wo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inal.wo.model.request.LoginRequest;
import com.inal.wo.model.request.RegisterRequest;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.model.response.LoginResponse;
import com.inal.wo.service.AuthService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<GeneralResponse<String>> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }
    

}

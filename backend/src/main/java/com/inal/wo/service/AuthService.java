package com.inal.wo.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.inal.wo.entity.User;
import com.inal.wo.model.request.LoginRequest;
import com.inal.wo.model.response.LoginResponse;
import com.inal.wo.repository.UserRepository;
import com.inal.wo.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
  
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
      log.info("Request login with username {} and password {}", 
          request.getUsername(), request.getPassword());
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(
          () -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "username not found"));

      if(!user.getPassword().equals(request.getPassword())) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "password wrong");
      }
      String token = jwtUtil.generateToken(request.getUsername());

      LoginResponse response = new LoginResponse();
      response.setMessage("Login Success");
      response.setToken(token);
      return response;
    }
}

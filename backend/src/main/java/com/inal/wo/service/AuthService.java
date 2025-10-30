package com.inal.wo.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.inal.wo.entity.User;
import com.inal.wo.model.enums.UserRoleEnum;
import com.inal.wo.model.request.LoginRequest;
import com.inal.wo.model.request.RegisterRequest;
import com.inal.wo.model.response.GeneralResponse;
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
        User user = userRepository.findByEmail(request.getUsername()).orElseThrow(
          () -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "email not found"));

      if(!user.getPassword().equals(request.getPassword())) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "password wrong");
      }
      String token = jwtUtil.generateToken(user);

      LoginResponse response = new LoginResponse();
      response.setMessage("Login Success");
      response.setToken(token);
      return response;
    }
    

    public GeneralResponse<String> register(RegisterRequest request) {
      log.info("Register with request {}", request);

      // if email already exists, reject registration
      if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email already exists");
      }

      // create and save new user
      User newUser = new User();
      newUser.setEmail(request.getEmail());
      newUser.setPassword(request.getPassword());
      newUser.setAddress(request.getAddress());
      newUser.setPhoneNumber(request.getPhoneNumber());
      newUser.setRole(UserRoleEnum.CUSTOMER);
      userRepository.save(newUser);


      GeneralResponse<String> response = new GeneralResponse<>();
      response.setStatus(201);
      response.setMessage("Register Success");
      return response;
    }
}

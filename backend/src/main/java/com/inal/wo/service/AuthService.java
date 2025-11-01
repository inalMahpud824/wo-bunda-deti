package com.inal.wo.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.inal.wo.entity.PasswordReset;
import com.inal.wo.entity.User;
import com.inal.wo.model.enums.UserRoleEnum;
import com.inal.wo.model.request.ForgotPasswordRequest;
import com.inal.wo.model.request.LoginRequest;
import com.inal.wo.model.request.RegisterRequest;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.model.response.LoginResponse;
import com.inal.wo.repository.PasswordResetRepository;
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
    private final MailService mailService;
    private final PasswordResetRepository passwordResetRepository;

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
      newUser.setName(request.getName());
      userRepository.save(newUser);


      GeneralResponse<String> response = new GeneralResponse<>();
      response.setStatus(201);
      response.setMessage("Register Success");
      return response;
    }

    @Transactional
    public GeneralResponse<String> forgotPassword(ForgotPasswordRequest request){
      log.info("request forgot password with email {}", request.getEmail());

      User user = userRepository.findByEmail(request.getEmail()).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "email tidak ditemukan"));

      String code = UUID.randomUUID().toString().substring(0, 8); // misalnya 8 karakter random
      mailService.sendCodeResetPassword(request.getEmail(), code);

      PasswordReset pr = new PasswordReset();
      pr.setCreatedAt(LocalDateTime.now());
      pr.setToken(code);
      pr.setUser(user);
      pr.setExpiredAt(LocalDateTime.now().plusHours(1));

      passwordResetRepository.save(pr);

      GeneralResponse<String> response = new GeneralResponse<>();
      response.setStatus(200);
      response.setMessage("Cek email mu sekarang");
      return response;
    }

    public GeneralResponse<String> validationToken(ForgotPasswordRequest request) {
      log.info("request validation token with request {}", request);

      PasswordReset reset = passwordResetRepository.findByToken(request.getToken()).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token salah")
      );

      if(!reset.getUser().getEmail().equals(request.getEmail())) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Server Error");
      }

      if(LocalDateTime.now().isAfter(reset.getExpiredAt())) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "token Expired");
      }
      GeneralResponse<String> response = new GeneralResponse<>();
      response.setStatus(200);
      response.setMessage("Validasi berhasil");

      return response;

    }

    @Transactional
    public GeneralResponse<String> changePassword(ForgotPasswordRequest request){
      log.info("request change password with data {}", request);

      validationToken(request);

      Optional<User> user = userRepository.findByEmail(request.getEmail());
      user.get().setPassword(request.getPasswordNew());

      userRepository.save(user.get());

      GeneralResponse<String> response = new GeneralResponse<>();
      response.setStatus(200);
      response.setMessage("Berhasil rubah password");
      return response;
    }

    
}

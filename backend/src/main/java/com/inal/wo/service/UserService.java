package com.inal.wo.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.inal.wo.entity.User;
import com.inal.wo.model.request.UserUpdateRequest;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public GeneralResponse<String> updateProfile(UserUpdateRequest request) {
      log.info("request update user with user data {}", request);

      User user = userRepository.findById(request.getId()).orElseThrow( 
          () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

      user.setAddress(request.getAddress());
      user.setName(request.getName());
      user.setPhoneNumber(request.getPhoneNumber());
      userRepository.save(user);

      GeneralResponse<String> response = new GeneralResponse<>();
      response.setStatus(200);
      response.setMessage("Berhasil mengupdate profile");
      return response;
    }

    public User getUserById(Long id) {
      log.info("Request get user by id {}", id );

      return userRepository.findById(id).orElseThrow(
          () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}

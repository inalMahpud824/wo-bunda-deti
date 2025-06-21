package com.inal.wo.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.inal.wo.entity.Contact;
import com.inal.wo.model.request.ContactRequest;
import com.inal.wo.repository.ContactRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactRepository contactRepository;

    public List<Contact> getAllContact() {
      log.info("Request get all contact");

      return contactRepository.findAll();
    }

    @Transactional
    public Contact updateContact(Long id, ContactRequest request) {
      Contact contact = contactRepository.findById(id).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "kontak tidak ditemukan"));

      contact.setEmail(request.getEmail());
      contact.setPhoneNumber(request.getPhoneNumber());

      contactRepository.save(contact);
      return contact;
    }

  
}

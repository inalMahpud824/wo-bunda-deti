package com.inal.wo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inal.wo.entity.Contact;
import com.inal.wo.model.request.ContactRequest;
import com.inal.wo.service.ContactService;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController()
@RequiredArgsConstructor
@RequestMapping("/contact")
public class ContactController {
  
    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContact() {
        return ResponseEntity.ok(contactService.getAllContact());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
      @PathVariable Long id, @RequestBody ContactRequest request) {
        
        return ResponseEntity.ok(contactService.updateContact(id, request));
    }
    
}

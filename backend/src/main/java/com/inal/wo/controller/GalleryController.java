package com.inal.wo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.service.GalleryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/gallery")
public class GalleryController {

  private final GalleryService galleryService;

  
  @Operation(summary = "Upload multiple images to gallery")
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<GeneralResponse<Void>> uploadGallery(
    @Parameter(description = "Upload multiple images", content = @Content(mediaType = MediaType.APPLICATION_OCTET_STREAM_VALUE))
    @RequestPart("images") MultipartFile[] files
  ) {
    return ResponseEntity.ok(galleryService.uploadGallery(files));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<GeneralResponse<Void>> deletePhotoById(@PathVariable Long id) {
    return ResponseEntity.ok(galleryService.deletePhoto(id));
  }

}

package com.inal.wo.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.inal.wo.entity.Gallery;
import com.inal.wo.model.response.GeneralResponse;
import com.inal.wo.repository.GalleryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GalleryService {

  private final GalleryRepository galleryRepository;
  private static final String UPLOAD_DIR = "uploads";
  private final Clock clock;

  @Transactional
  public GeneralResponse<Void> uploadGallery(MultipartFile[] request) {
    log.info("request upload gallery with request {} ", (Object) request);
    // Buat folder jika belum ada
    File dir = new File(UPLOAD_DIR);
    if (!dir.exists())
      dir.mkdirs();

    List<Gallery> listPhoto = new ArrayList<>();
    for (MultipartFile file : request) {
      try {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filepath = Paths.get(UPLOAD_DIR, filename);
        Files.write(filepath, file.getBytes());
        Gallery data = new Gallery();
        data.setCreatedAt(LocalDateTime.now(clock));
        data.setPhoto(filename);
        listPhoto.add(data);
      } catch (Exception e) {
        log.error("Gagal menyimpan gambar baru api gallery", e);
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Gagal menyimpan gambar baru");
      }
    }

    galleryRepository.saveAll(listPhoto);
    GeneralResponse<Void> response = new GeneralResponse<>();
    response.setMessage("Berhasil Menyimpan gambar");
    response.setStatus(201);
    return response;
  }

  public List<Gallery> getAllPhotoGallery() {
    log.info("request api get all Photo");
    return galleryRepository.findAllByOrderByCreatedAtDesc();
  }

  @Transactional
  public GeneralResponse<Void> deletePhoto(Long id) {
    log.info("request delete photo gallery with id {} ", id);
    Gallery photo = galleryRepository.findById(id).orElseThrow(
        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Photo tidak ditemukan"));

    // hapus file
    deleteFile(photo);

    // hapus data gallery di db
    galleryRepository.delete(photo);

    GeneralResponse<Void> response = new GeneralResponse<>();
    response.setMessage("Berhasil Menghapus photo");
    response.setStatus(200);
    return response;
  }

  private void deleteFile(Gallery gallery) {
    // Hapus file gambar
    if (gallery.getPhoto() != null) {
      Path imagePath = Paths.get(UPLOAD_DIR, gallery.getPhoto());
      try {
        Files.deleteIfExists(imagePath);
        log.info("Gambar {} berhasil dihapus", imagePath);
      } catch (IOException e) {
        log.error("Gagal menghapus gambar: {}", imagePath, e);
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Gagal menghapus gambar gallery");
      }
    }
  }
}

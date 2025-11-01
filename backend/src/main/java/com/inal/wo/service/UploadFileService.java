package com.inal.wo.service;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.inal.wo.model.response.CloudinaryResponse;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UploadFileService {

    public CloudinaryResponse uploadFile(MultipartFile file) {
        Dotenv dotenv = Dotenv.load();
        Cloudinary cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));
            try {
              Map params1 = ObjectUtils.asMap(
                  "use_filename", true,
                  "unique_filename", true,
                  "overwrite", true);
              Map response = cloudinary.uploader().upload(file.getBytes(), params1); 
              return builCloudinaryResponse(response);
            } catch (Exception e) {
              log.error("Gagal upload ke Cloudinary", e);
              throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "gagal upload gambar");
            }
    }

    public void deleteImage(String publicId) {
      // Set your Cloudinary credentials
      Dotenv dotenv = Dotenv.load();
      Cloudinary cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));
      try {
        Map result =  cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        log.info("berhasil hapus {}", result);
      } catch (Exception e) {
        log.error("Gagal hapus ke Cloudinary", e);
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "gagal hapus gambar");
      }
    }

    private CloudinaryResponse builCloudinaryResponse(Map response) {
      CloudinaryResponse res = new CloudinaryResponse();
      res.setAssetId(response.get("asset_id").toString());
      res.setSecureUrl(response.get("secure_url").toString());
      res.setPublicId(response.get("public_id").toString());
      return res;
      
    }

}

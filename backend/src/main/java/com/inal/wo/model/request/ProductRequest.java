package com.inal.wo.model.request;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
  
    @NotBlank(message = "nama product tidak boleh kosong")
    private String name;
    @NotNull(message = "harga product tidak boleh kosong")
    private BigDecimal price;
    @NotNull(message = "photo tidak boleh kosong")
    private MultipartFile photo;
}

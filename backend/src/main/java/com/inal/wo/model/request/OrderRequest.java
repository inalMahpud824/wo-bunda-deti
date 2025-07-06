package com.inal.wo.model.request;

import java.time.LocalDate;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
  
    @NotNull
    private LocalDate eventDate;

    @NotBlank
    private String customerName;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String address;

    @NotNull
    private Long orderStatusId;

    private String note;

    @NotNull
    @Schema(type = "string", format = "binary")
    private MultipartFile paymentProof;

    @NotEmpty
    private List<Long> productId;
}

package com.inal.wo.model.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
  
    private Long id;
    private String productName;
    private BigDecimal price;
    private Boolean activeStatus;
    private String photo;
    private String detailDescription;
    private String shortDescription;
    private Long productId;
}

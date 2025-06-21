package com.inal.wo.model.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemOrderResponse {
  
    private Long idProduct;
    private String productName;
    private BigDecimal priceAtOrder;
}

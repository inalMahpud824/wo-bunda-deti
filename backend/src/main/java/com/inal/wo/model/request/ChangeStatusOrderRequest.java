package com.inal.wo.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeStatusOrderRequest {
  
  private Long orderStatusId;
}

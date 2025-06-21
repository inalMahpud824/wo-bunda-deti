package com.inal.wo.model.request;

import com.inal.wo.model.enums.OrderStatusEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangeStatusOrderRequest {
  
  private OrderStatusEnum status;
}

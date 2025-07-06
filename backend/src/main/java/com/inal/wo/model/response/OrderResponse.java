package com.inal.wo.model.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.inal.wo.entity.OrderStatus;
import com.inal.wo.model.enums.OrderStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private LocalDate eventDate;
    private String customerName;
    private String address;
    private String phoneNumber;
    private String note;
    private OrderStatus status;
    private BigDecimal totalPrice;
    private String paymentProof;
    private LocalDateTime orderDate;
    private LocalDateTime updateAt;
    private List<ItemOrderResponse> itemsOrder;

}
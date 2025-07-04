package com.inal.wo.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactRequest {
  
  private String phoneNumber;
  private String bankName;
  private String accountNumber;
  private String ownerNameAccount;
}

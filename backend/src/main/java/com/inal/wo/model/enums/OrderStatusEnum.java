package com.inal.wo.model.enums;

public enum OrderStatusEnum {
  MENUNGGU, // Pesanan baru masuk, menunggu diproses admin
  DIPROSES, // Pesanan sedang dikerjakan/admin sedang menangani
  SELESAI, // Pesanan sudah selesai ditangani
  DIBATALKAN // Pesanan dibatalkan (oleh user/admin)
}

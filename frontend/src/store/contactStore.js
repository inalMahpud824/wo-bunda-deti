import { create } from "zustand";

export const useContact = create((set) => ({
  phoneNumber: "",
  bankName: "",
  accountNumber: "",
  ownerAccountName: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setBankName: (bankName) => set({ bankName }),
  setAccountNumber: (accountNumber) => set({ accountNumber }),
  setOwnerAccountName: (ownerAccountName) => set({ ownerAccountName }),
}));
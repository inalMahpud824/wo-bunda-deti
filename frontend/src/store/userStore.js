import { create } from "zustand";

export const useUser = create((set) => ({
  role: "",
  userId: "",
  token: "",
  login: false,
  // image: null,
  setLogin: (login) => set({ login }),
  setToken: (token) => set({ token }),
  setRole: (role) => set({ role }),
  setUserId: (userId) => set({ userId }),
  // setImage: (image) => set({ image }),
}));

import { create } from "zustand";

export const useUser = create((set) => ({
  // role: "",
  // name: "",
  token: "",
  login: false,
  // image: null,
  setLogin: (login) => set({ login }),
  setToken: (token) => set({ token }),
  // setRole: (role) => set({ role }),
  // setName: (name) => set({ name }),
  // setImage: (image) => set({ image }),
}));

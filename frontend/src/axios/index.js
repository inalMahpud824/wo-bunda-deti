import axios from "axios";
export const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const instance = axios.create({ baseURL });
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

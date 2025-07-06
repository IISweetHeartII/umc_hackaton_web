// src/apis/axios.ts
import axios from "axios";
import { useAuthStore } from "../stores/auth";

// baseURL을 /api로 설정하면 vite.config.ts의 프록시 설정에 따라 요청이 전달됩니다.
const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  // token이 없어도 undefined 처리 (문제 없음)
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // 혹시 로그아웃 함수가 없는 상황(아직 미구현)도 대비
    if (err.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      if (logout) logout();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;

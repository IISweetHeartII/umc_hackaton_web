import { create } from "zustand";

interface AuthState {
  userId: number | null;
  token: string | null;
  setAuth: (userId: number, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: localStorage.getItem("userId")
    ? Number(localStorage.getItem("userId"))
    : null,
  token: localStorage.getItem("token"),
  setAuth: (userId, token) => {
    localStorage.setItem("userId", String(userId));
    localStorage.setItem("token", token);
    set({ userId, token });
  },
  logout: () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    set({ userId: null, token: null });
  },
}));

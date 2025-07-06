import { create } from "zustand";

// 스토어에서 관리할 데이터의 타입 정의
interface SignupFormData {
  // TermsPage
  termsOfService: boolean;
  privacyPolicy: boolean;
  age: boolean;
  marketing: boolean;
  push: boolean;

  // AccountPage (비밀번호는 저장하지 않음)
  userId: string;
  password?: string;

  // ProfilePage
  name: string;
  profileImage: string | null; // Base64 인코딩된 이미지 문자열
  birthDate: string;

  // ExtraPage
  region: string | null;
  disable: string | null; // 'DISABLED' | 'NON_DISABLED'
  disabilityLevel: string | null;
  disabilityType: string | null;
}

interface SignupState extends SignupFormData {
  updateFormData: (data: Partial<SignupFormData>) => void;
  reset: () => void;
}

const initialState: SignupFormData = {
  termsOfService: false,
  privacyPolicy: false,
  age: false,
  marketing: false,
  push: false,
  userId: "",
  password: "",
  name: "",
  profileImage: null,
  birthDate: "",
  region: null,
  disable: null,
  disabilityLevel: null,
  disabilityType: null,
};

export const useSignupStore = create<SignupState>((set) => ({
  ...initialState,
  updateFormData: (data) => set((state) => ({ ...state, ...data })),
  reset: () => set(initialState),
}));

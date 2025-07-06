import api from "./axios";

// --- 타입 정의 ---
// API 연동에 필요한 타입들을 정의합니다.
// 나중에 타입이 많아지면 src/apis/types.ts 같은 파일로 분리하는 것을 고려해볼 수 있습니다.

// 로그인 요청 (POST /login)
export interface LoginRequest {
  loginId: string;
  password: string;
}

// 로그인 응답 결과 (POST /login)
export interface LoginResult {
  memberId: number;
  accessToken: string;
}

// API 응답을 위한 제네릭 타입
interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 회원가입 요청 (POST /users/join)
export interface SignupRequest {
  name: string;
  loginId: string;
  password?: string;
  birth: string; // "YYYY-MM-DD"
  region: string | null;
  disable: string | null;
  hardness: string | null;
  disableType: string | null;
  profileImage: string | null;
}

// 회원가입 응답 결과 (POST /users/join)
export interface SignupResult {
  userId: number;
  createdAt: string; // "2025-07-05T19:01:32.539Z"
}

// --- API 요청 함수 ---

/**
 * 로그인 API
 * @param data {loginId, password}
 * @returns Promise<LoginResult>
 */
export const login = async (data: LoginRequest): Promise<LoginResult> => {
  const response = await api.post<ApiResponse<LoginResult>>("/login", data);
  return response.data.result;
};

/**
 * 회원가입 API
 * @param data SignupRequest
 * @returns Promise<SignupResult>
 */
export const signup = async (data: SignupRequest): Promise<SignupResult> => {
  const response = await api.post<ApiResponse<SignupResult>>(
    "/users/join",
    data
  );
  return response.data.result;
};

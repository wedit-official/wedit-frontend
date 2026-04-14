// 로그인
export interface LoginRequest {
  email: string;
  password: string;
}

// TODO: 백엔드 응답 구조 확인 필요 — accessToken/refreshToken 가정
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// 회원가입
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

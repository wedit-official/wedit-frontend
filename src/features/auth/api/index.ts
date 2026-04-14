import { api } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { LoginRequest, LoginResponse, SignupRequest } from '@/features/auth/types';

/**
 * 로그인 — Next.js Route Handler 프록시 경유
 * Route Handler가 쿠키를 set한 뒤 data: null을 반환
 */
export function login(body: LoginRequest): Promise<ApiResponse<null>> {
  return api.post<null>('/api/auth/login', body, { auth: false });
}

/**
 * 회원가입 — 백엔드 직접 호출
 * TODO: 백엔드 회원가입 응답 data 타입 확인 필요
 */
export function signup(body: SignupRequest): Promise<ApiResponse<null>> {
  return api.post<null>('/api/v1/member/signup', body, { auth: false });
}

/**
 * 토큰 재발급 — Next.js Route Handler 프록시 경유
 * TODO: 백엔드 토큰 재발급 응답 구조 확인 필요 (LoginResponse 가정)
 */
export function tokenReissue(): Promise<ApiResponse<LoginResponse>> {
  return api.post<LoginResponse>('/api/auth/token-reissue', undefined, { auth: false });
}

/**
 * 회원 탈퇴 — 인증 필요 (auth: true 기본값)
 */
export function withdraw(): Promise<ApiResponse<null>> {
  return api.delete<null>('/api/v1/member/withdraw');
}

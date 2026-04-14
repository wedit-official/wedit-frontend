export { api, ApiError } from './client';
export type { ApiResponse } from './client';
// 서버 전용 (클라이언트 번들 오염 방지를 위해 직접 import):
//   fetchWithAuthServer → '@/lib/api/interceptors.server'
//   getTokensFromCookies → '@/lib/api/cookies'

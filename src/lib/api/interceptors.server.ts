/**
 * 서버용 fetch 인터셉터 — next/headers 쿠키를 읽어 Authorization 헤더 주입
 *
 * 서버 컴포넌트에서만 사용. 클라이언트 번들에 포함되지 않도록 별도 파일로 분리.
 */

import { getTokensFromCookies } from './cookies';

export async function fetchWithAuthServer(
  input: string | URL | Request,
  init?: RequestInit,
): Promise<Response> {
  const { accessToken, refreshToken } = await getTokensFromCookies();

  const headers = new Headers(init?.headers);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (refreshToken) {
    headers.set('X-Refresh-Token', refreshToken);
  }

  return fetch(input, { ...init, headers });
}

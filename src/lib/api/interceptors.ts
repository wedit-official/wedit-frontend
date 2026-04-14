/**
 * 클라이언트용 fetch 인터셉터 — httpOnly 쿠키 기반 인증
 *
 * credentials: 'include'로 쿠키 자동 전송,
 * 401 시 /api/auth/token-reissue Route Handler를 통해 재발급 후 재시도
 */

// 토큰 재발급 중복 요청 방지
let refreshPromise: Promise<boolean> | null = null;

async function reissueToken(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/token-reissue', {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) return false;

    const json = await response.json();
    return json.success;
  } catch {
    return false;
  }
}

/** 클라이언트용 인터셉터 — 쿠키 자동 전송 + 401 재발급 재시도 */
export async function fetchWithAuth(
  input: string | URL | Request,
  init?: RequestInit,
): Promise<Response> {
  let response = await fetch(input, {
    ...init,
    credentials: 'include',
  });

  // 401 시 토큰 재발급 후 1회 재시도
  if (response.status === 401) {
    if (!refreshPromise) {
      refreshPromise = reissueToken().finally(() => {
        refreshPromise = null;
      });
    }

    const refreshed = await refreshPromise;

    if (refreshed) {
      response = await fetch(input, { ...init, credentials: 'include' });
    }
  }

  return response;
}

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const ACCESS_TOKEN_MAX_AGE = 30 * 60; // 30분
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7일

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

/** NextResponse에 토큰 쿠키를 세팅한다 (Route Handler 전용) */
export function setTokenCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
) {
  response.cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  response.cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

/** NextResponse에서 토큰 쿠키를 삭제한다 (Route Handler 전용) */
export function clearTokenCookies(response: NextResponse) {
  response.cookies.set(ACCESS_TOKEN_KEY, '', {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_KEY, '', {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
}

/** 서버 컴포넌트 / Route Handler에서 쿠키 읽기 (next/headers) */
export async function getTokensFromCookies() {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_KEY)?.value ?? null,
    refreshToken: cookieStore.get(REFRESH_TOKEN_KEY)?.value ?? null,
  };
}

export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY };

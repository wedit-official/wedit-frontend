import { NextRequest, NextResponse } from 'next/server';
import {
  setTokenCookies,
  clearTokenCookies,
  REFRESH_TOKEN_KEY,
} from '@/lib/api/cookies';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { status: 401, success: false, message: '리프레시 토큰 없음', data: null },
      { status: 401 },
    );
  }

  const backendRes = await fetch(`${BASE_URL}/api/v1/member/token-reissue`, {
    method: 'POST',
    headers: { 'X-Refresh-Token': refreshToken },
  });

  const json = await backendRes.json();

  if (!backendRes.ok || !json.success) {
    const response = NextResponse.json(json, { status: backendRes.status });
    clearTokenCookies(response);
    return response;
  }

  // TODO: 백엔드 응답 구조 확인 필요 — json.data.{ accessToken, refreshToken } 가정
  const { accessToken: newAccess, refreshToken: newRefresh } = json.data;
  const response = NextResponse.json({
    status: json.status,
    success: true,
    message: json.message,
    data: null,
  });

  setTokenCookies(response, newAccess, newRefresh);
  return response;
}

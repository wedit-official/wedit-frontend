import { NextRequest, NextResponse } from 'next/server';
import { setTokenCookies } from '@/lib/api/cookies';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const backendRes = await fetch(`${BASE_URL}/api/v1/member/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await backendRes.json();

  if (!backendRes.ok || !json.success) {
    return NextResponse.json(json, { status: backendRes.status });
  }

  // TODO: 백엔드 응답 구조 확인 필요 — json.data.{ accessToken, refreshToken } 가정
  const { accessToken, refreshToken } = json.data;
  const response = NextResponse.json({
    status: json.status,
    success: true,
    message: json.message,
    data: null,
  });

  setTokenCookies(response, accessToken, refreshToken);
  return response;
}

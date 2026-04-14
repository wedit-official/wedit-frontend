import { NextResponse } from 'next/server';
import { clearTokenCookies } from '@/lib/api/cookies';

export async function POST() {
  const response = NextResponse.json({
    status: 200,
    success: true,
    message: '로그아웃 완료',
    data: null,
  });

  clearTokenCookies(response);
  return response;
}

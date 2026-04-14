// 공통 응답 타입
export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

// HTTP 메서드별 옵션
type RequestOptions = Omit<RequestInit, 'method' | 'body'> & {
  params?: Record<string, string>;
  /** true면 인터셉터(JWT 주입, 401 재시도) 적용. 기본값 true */
  auth?: boolean;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/**
 * fetch 래퍼 — baseURL 결합, JSON 직렬화, 공통 헤더 적용
 * auth 옵션이 true(기본)이면 fetchWithAuth를 사용하여 JWT 주입·401 재시도 처리
 *
 * 브라우저: 상대경로로 요청 → Next.js rewrites/Route Handler 경유 (CORS 우회)
 * 서버(SSR): BASE_URL을 붙여 백엔드 직접 호출
 */
async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { params, headers: customHeaders, auth = true, ...restInit } = options;

  // 브라우저에서는 상대경로(same-origin), 서버에서는 BASE_URL 사용
  const origin = typeof window !== 'undefined' ? window.location.origin : BASE_URL;
  const url = new URL(path, origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const headers = new Headers(customHeaders);
  if (!headers.has('Content-Type') && body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  // 클라이언트에서 auth가 true면 인터셉터 적용 (쿠키 자동 전송 + 401 재시도)
  // 서버(SSR)에서 인증 API가 필요하면 interceptors.server.ts를 직접 사용
  let fetchFn = fetch;
  if (auth && typeof window !== 'undefined') {
    const { fetchWithAuth } = await import('./interceptors');
    fetchFn = fetchWithAuth;
  }

  const response = await fetchFn(url.toString(), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...restInit,
  });

  // 204 No Content 등 빈 응답 처리
  if (response.status === 204) {
    return { status: 204, success: true, message: '', data: null as T };
  }

  const json: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new ApiError(json.message, response.status, json);
  }

  return json;
}

// API 에러 클래스
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response: ApiResponse<unknown>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 메서드별 단축 함수
export const api = {
  get<T>(path: string, options?: RequestOptions) {
    return request<T>('GET', path, undefined, options);
  },
  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>('POST', path, body, options);
  },
  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>('PUT', path, body, options);
  },
  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return request<T>('PATCH', path, body, options);
  },
  delete<T>(path: string, options?: RequestOptions) {
    return request<T>('DELETE', path, undefined, options);
  },
} as const;

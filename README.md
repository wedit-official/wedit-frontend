# wedit-frontend

결혼 업체 중개 서비스 플랫폼 **Wedit**의 프론트엔드(Next.js) 프로젝트입니다.

## 기술 스택
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **State**: Zustand
- **UI Docs**: Storybook (`@storybook/nextjs-vite`)
- **Quality**: ESLint + Prettier(`prettier-plugin-tailwindcss`)
- **Deploy**: Vercel

## 로컬 실행
```bash
npm install
npm run dev
```

- 기본 접속: `http://localhost:3000`

## Storybook
```bash
npm run storybook
```

- 기본 접속: `http://localhost:6006`
- 스토리 위치: `src/components/**/*.stories.tsx`
- 전역 스타일(Tailwind/폰트)은 `.storybook/preview.ts`에서 `src/app/globals.css`를 import해 동일하게 적용합니다.

## 스크립트
- **dev**: `next dev`
- **build**: `next build`
- **start**: `next start`
- **lint**: `eslint`
- **format**: `prettier . --write`
- **format:check**: `prettier . --check`
- **storybook**: `storybook dev -p 6006`
- **build-storybook**: `storybook build`

## 프로젝트 구조
```text
src/
  app/                    # Next.js App Router (페이지/레이아웃)
    layout.tsx            # 전역 폰트/메타데이터/공통 레이아웃
    page.tsx              # (임시) 홈/데모 UI
    globals.css           # Tailwind import + 전역 토큰/스타일

  components/             # 공통 UI (Atomic Design)
    atoms/
    molecules/
    organisms/
    templates/

  store/                  # Zustand 스토어
```

### Atomic Design 규칙
- `atoms/`: 가장 작은 UI 단위(버튼, 인풋, 텍스트 등)
- `molecules/`: atoms 조합(예: Counter, SearchBar)
- `organisms/`: 섹션 단위(예: Header, Footer)
- `templates/`: 페이지 레이아웃 템플릿

도메인에 강하게 결합된 UI/로직이 생기면 `src/features/` 분리를 권장합니다.

## SSR/CSR 경계(중요)
기본 원칙은 **서버 컴포넌트 우선(RSC/SSR)** 입니다.

아래 경우에만 컴포넌트 상단에 `'use client'`를 사용합니다.
- 브라우저 전용 API 사용(`window`, `localStorage` 등)
- 이벤트 핸들러/인터랙션이 필요한 UI
- Zustand 스토어를 구독하는 UI 레이어

Zustand는 `src/store/`에 두고, **스토어 훅을 사용하는 컴포넌트는 반드시 클라이언트 컴포넌트**로 작성합니다.

## 스타일/디자인 토큰
- 기본 폰트는 `next/font`로 적용하며 `layout.tsx`에서 CSS 변수(`--font-sans`, `--font-mono`)로 주입합니다.
- Tailwind 확장 토큰(초기안)은 `tailwind.config.ts`의 `theme.extend`에 정의되어 있습니다.

## 환경 변수
- 로컬/배포 환경변수는 `.env`에 두고, 공유용 템플릿은 `.env.example`을 사용합니다.
- Vercel 배포 시에는 Vercel 프로젝트 설정의 Environment Variables에 동일 키를 등록합니다.

## 브랜치/협업 플로우
이 프로젝트는 **`dev`를 기본 브랜치**로 운영합니다.

- 이슈 생성
- `feature/<issue>-<slug>` 브랜치 생성 후 작업
- PR 생성 → 리뷰/체크 통과 → `dev`로 머지

자세한 규칙은 `CONTRIBUTING.md`를 참고하세요.

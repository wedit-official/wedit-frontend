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
아래는 **팀 컨벤션(권장)** 기준의 폴더 구조 및 역할입니다.

```text
src/
  app/                                  # 라우팅/레이아웃(기본: 서버 컴포넌트)
    (public)/
      (auth)/
        login/
          page.tsx                      # SSR 페이지(얇게 유지, 폼 import)
    layout.tsx
    globals.css

  components/                           # 공용 컴포넌트(재사용 위주)
    ui/                                 # 디자인 시스템(Atomic)
      atoms/
      molecules/
      organisms/
      templates/
    shared/                             # 범도메인 공용(레이아웃/네비/피드백 등)
      layouts/
      navigation/
      feedback/
    pages/                              # (선택) 페이지 전용 조각(최소화)
      auth/
        login/
          LoginHero.tsx

  features/                             # 도메인 단위(권장)
    auth/
      components/
        LoginForm/
          LoginForm.tsx                 # (보통 use client) 페이지 폼 컴포넌트
          _components/                  # LoginForm 전용 조각(외부 재사용 금지)
            LoginFields.tsx
            LoginActions.tsx
          index.ts
          LoginForm.stories.tsx         # 선택(Storybook)
      api/
        authApi.ts
      model/
        auth.types.ts
        auth.constants.ts
      store/
        authStore.ts                    # 도메인 전용 zustand(선택)

  store/                                # 앱 전역/범도메인 zustand(예: ui)
    uiStore.ts
    index.ts

  lib/                                  # 공용 유틸(서버/클라 경계 명확히)
    fetch/
      fetcher.ts
    server/
      cookies.ts
    client/
      storage.ts

  styles/                               # (선택) 토큰/추가 css layer
    tokens.css

  types/
    common.ts

  constants/
    routes.ts

  stories/                              # (선택) 샘플/실험(안 쓰면 제거)
```

## 폴더 구조 규칙(컨벤션)
### 1) `app/` 라우팅 규칙
- **`app/**/page.tsx`는 기본 SSR(RSC)로 사용**합니다. 가능하면 `'use client'`를 붙이지 않습니다.
- `page.tsx`는 **얇게** 유지합니다.
  - 라우트 레이아웃/메타데이터/서버 데이터 조립(필요 시) + 페이지 폼 import 정도만 담당

예시:
- `src/app/(public)/(auth)/login/page.tsx` → `LoginForm`을 import 해서 배치

### 2) 도메인 규칙: `features/<domain>/...`
- 기능(도메인) 단위 코드는 `src/features/<domain>/` 아래로 모읍니다.
- 페이지에서 실제 UI/로직의 중심이 되는 **페이지 폼 컴포넌트는**:
  - `src/features/<domain>/components/<PageForm>/`에 둡니다.
  - 예: `features/auth/components/LoginForm/LoginForm.tsx`

### 3) 페이지 전용 조각: `_components/`
- 특정 페이지 폼에서만 사용하는 내부 컴포넌트는:
  - `features/<domain>/components/<PageForm>/_components/`에 둡니다.
  - 예: `LoginFields.tsx`, `LoginActions.tsx`
- `_components` 내부는 **외부 재사용을 금지**(해당 폼 내부 전용)로 운영합니다.

### 4) 공용 컴포넌트: `components/ui`, `components/shared`, `components/pages`
- **`components/ui`**: 디자인 시스템(Atomic). 도메인/페이지에 독립적인 재사용 UI만 둡니다.
- **`components/shared`**: 범도메인 공용(레이아웃, 네비게이션, 로딩/에러/토스트 등).
- **`components/pages`**: “특정 페이지에서만 쓰는 조각”을 모을 때 사용합니다(가능하면 최소화).
  - 페이지 전용 조각은 우선 `features/.../_components`에 두고, 라우트 구조상 분리가 꼭 필요할 때만 `components/pages`를 사용합니다.

### 5) SSR/CSR 경계 운영(중요)
- 기본은 **서버 컴포넌트 우선(RSC/SSR)** 입니다.
- 아래 경우에만 컴포넌트 상단에 `'use client'`를 사용합니다.
  - 브라우저 전용 API 사용(`window`, `localStorage` 등)
  - 이벤트 핸들러/인터랙션이 필요한 UI(폼, 입력, 클릭 등)
  - Zustand 스토어를 구독하는 UI 레이어
- 실전 운영 원칙: **페이지는 SSR 유지**, 필요한 부분(페이지 폼/입력 폼)만 CSR로 분리합니다.

### 6) Zustand 위치 규칙
- 앱 전역/범도메인 UI 상태: `src/store/` (예: `uiStore.ts`)
- 도메인에 강하게 결합된 상태: `src/features/<domain>/store/` (예: `features/auth/store/authStore.ts`)
- **스토어 훅을 사용하는 컴포넌트는 반드시 클라이언트 컴포넌트**여야 합니다.

### 7) Storybook 규칙
- 공용 UI/도메인 컴포넌트는 가능한 한 스토리를 함께 둡니다.
  - 예: `features/auth/components/LoginForm/LoginForm.stories.tsx`
  - 예: `components/ui/atoms/Button/Button.stories.tsx`
- Storybook은 `src/components/**/*.stories.tsx` 패턴을 기본으로 사용합니다.

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

## Git 컨벤션(권장)
가장 널리 쓰이는 **GitHub Flow + Conventional Commits** 기반으로 운영합니다.

### 브랜치 네이밍
- `feat/<issue>-<slug>`
  - 예: `feat/123-login-form`
- `fix/<issue>-<slug>`
  - 예: `fix/201-login-validation`
- `chore/<slug>`
  - 예: `chore/setup-storybook`
- `docs/<slug>`
  - 예: `docs/update-readme`

### 커밋 메시지(Conventional Commits)
형식:
```text
<type>(optional scope): <subject>
```

자주 쓰는 type:
- **feat**: 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 포맷팅/세미콜론/공백 등(동작 변경 없음)
- **refactor**: 리팩터링(기능 변경 없이 구조 개선)
- **test**: 테스트 추가/수정
- **chore**: 빌드/도구/설정/의존성 등 기타 작업

예시:
```text
feat: 로그인 폼 유효성 검사 추가
fix: 로그인 중복 제출 방지
chore: 스토리북 초기화 및 스크립트 추가
docs: 폴더 구조 컨벤션 문서화
```

권장 규칙:
- subject는 **명령형**으로 짧게 작성(예: add, fix, update)
- 커밋은 가능한 **작게**, PR은 **리뷰 가능한 크기**로 유지

### PR 규칙(요약)
- base 브랜치: **`dev`**
- PR 제목도 가능하면 Conventional Commits 형태로 작성
- 머지 방식은 팀 합의로 통일(보통 **Squash merge** 선호)

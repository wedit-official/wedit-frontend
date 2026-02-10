## 컴포넌트 구조 (Atomic Design)

- `atoms/`: 버튼/인풋/텍스트처럼 가장 작은 UI 단위
- `molecules/`: atoms를 조합한 단위 (예: SearchBar)
- `organisms/`: 특정 섹션을 구성하는 단위 (예: Header, Footer)
- `templates/`: 페이지 레이아웃 템플릿 단위

원칙:

- 기본은 **서버 컴포넌트 우선**으로 두고, 이벤트/상태가 필요한 UI만 `'use client'`를 사용합니다.
- 재사용 가능한 공통 컴포넌트는 `components/`로, 도메인 종속 UI는 `features/`로 분리합니다.

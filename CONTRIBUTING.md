# Contributing

## 기본 브랜치
- 기본 브랜치는 **`dev`** 입니다.
- 기능 개발은 항상 `dev`에서 파생된 기능 브랜치에서 진행합니다.

## 브랜치 네이밍
- `feature/<issue>-<slug>`
  - 예: `feature/123-vendor-search`
- 핫픽스: `hotfix/<issue>-<slug>`

## 작업 흐름
1) GitHub에서 이슈 생성(라벨/담당자/간단한 범위 포함)\n
2) 로컬에서 최신 `dev` 기준으로 브랜치 생성

```bash
git switch dev
git pull
git switch -c feature/<issue>-<slug>
```

3) 작업 후 커밋
- 커밋 메시지는 변경 목적(why)을 먼저 적고, 범위를 간결히 유지합니다.

4) 원격 푸시 및 PR 생성
```bash
git push -u origin HEAD
```

5) PR 규칙
- PR 대상(base)은 **`dev`**
- 가능한 작은 단위로 PR을 쪼개기
- UI 변경 시 스크린샷/영상 첨부 권장
- Storybook 스토리 추가/갱신이 가능한 컴포넌트는 함께 업데이트 권장

## dev 기본 브랜치 설정(Repo 관리자)
GitHub에서 기본 브랜치를 `dev`로 변경합니다.
- Settings → Branches → Default branch → `dev`

> 참고: 이미 `origin/main`은 제거된 상태일 수 있으니, 기본 브랜치 전환 후 보호 규칙(필요 시)도 `dev` 기준으로 재설정하세요.


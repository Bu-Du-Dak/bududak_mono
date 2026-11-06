# bududak_mono

프론트엔드 개발자 홍재훈의 이력서·포트폴리오·블로그를 운영하는 Turborepo 모노레포입니다.
3개의 Next.js 앱이 공통 UI와 ESLint·TypeScript 설정 패키지를 함께 사용합니다.

| 앱 | 주소 | 설명 |
|---|---|---|
| `apps/resume` | https://www.bududak.com | 이력서 (경력, 스킬, 학력) |
| `apps/portfolio` | https://portfolio.bududak.com | 프로젝트 상세 (문제 → 선택한 방법 → 결과) |
| `apps/blog` | https://blog.bududak.com | Markdown 기반 개발·학습 노트 |

## 기술 스택

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: styled-components (공통 테마, 다크 모드)
- **Blog**: unified · remark · rehype-pretty-code · shiki (Markdown → HTML, 코드 하이라이트)
- **Test**: Jest · Testing Library (공통 UI), Playwright (블로그 E2E)
- **Monorepo**: Turborepo, pnpm workspace
- **Deploy**: Vercel (앱별 프로젝트)

## 구조

```text
bududak_mono
├─ apps
│  ├─ resume       # www.bududak.com
│  ├─ portfolio    # portfolio.bududak.com (프로젝트 데이터: src/constants/projects.ts)
│  └─ blog         # blog.bududak.com (글: src/contents/posts, E2E: __e2e__)
├─ packages
│  ├─ ui                 # 공통 컴포넌트·타이포그래피·테마·레이아웃 + 단위 테스트
│  ├─ eslint-config      # 공통 ESLint 설정
│  └─ typescript-config  # 공통 tsconfig
└─ scripts/github  # 이슈·브랜치·PR 자동화 스크립트
```

## 테스트

- **공통 UI 단위 테스트**: `packages/ui`의 Button, Chip, List, Typography 등 24개 (테스트 대상 기준 라인 커버리지 97.7%)
- **블로그 E2E**: Playwright로 목록 진입, 카테고리 이동, 글 상세 진입, 목차(TOC) 스크롤을 검증

```sh
pnpm test                  # 전체 단위 테스트 (turbo)
pnpm --filter blog e2e     # 블로그 E2E
```

## 작업 흐름 자동화

GitHub API를 호출하는 Node.js 스크립트로 이슈부터 PR까지의 반복 작업을 줄였습니다.

| 명령 | 동작 |
|---|---|
| `pnpm issue` | 타입(feat/fix 등)과 제목을 입력받아 이슈를 만들고 `issue-#번호` 브랜치로 전환 |
| `pnpm pr` | **테스트를 먼저 실행**하고, 통과하면 브랜치를 push한 뒤 develop 대상 PR 생성 |
| `pnpm pr:prod` | 테스트 후 develop → main 배포 PR 생성 |
| `pnpm sync` | 브랜치 동기화 |

`.env`에 GitHub 토큰과 저장소 정보가 필요합니다.

## 실행

```sh
pnpm install
pnpm dev:resume      # 또는 dev:portfolio, dev:blog
pnpm build           # 전체 빌드 (turbo 캐시)
```

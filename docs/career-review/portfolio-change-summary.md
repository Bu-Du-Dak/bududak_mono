# 포트폴리오 변경 요약

2026-10-28 / `codex/portfolio-career-evidence`

## 변경 범위

- 시작 시 Git 작업 트리는 깨끗했다. 별도 로컬 브랜치를 생성했다.
- 개인 저장소의 resume·portfolio 콘텐츠와 상세 라우트만 변경했다. 회사 저장소는 읽기 전용으로 분석했다.
- commit, push, 외부 배포는 하지 않았다.
- 기존 UI 패키지, 테마·타이포그래피·브레이크포인트, 헤더·푸터, 앱 레이아웃, 목록 카드 스타일, 모노레포·배포 설정은 변경하지 않았다.

## 경력 및 프로젝트별 변경

- 소개: 학습 플랫폼·실시간 협업에서 데이터 조회·렌더링 개선으로 이어지는 경력을 요약.
- SAVEE: 현 회사 첫 프로젝트로 배치. 선행 필터/API 순서, 로딩·오류, 테이블 메모이제이션·가공 분리, 동적 import·번들 분석, 배포 workflow 일부 기여를 기술.
- 협업 에디터: 방 단위 코드 동기화, 편집권·입력 구분, 실행 결과, AgoraRTC 이벤트를 기술. CRDT/OT 및 근거 없는 저지연·확장 성과 제외.
- 학습 플랫폼: 노트 검색·무료 수강·자료 등록·수강시간·첨삭 일정, 사용자/운영자 관점을 구체화. 결제 전체 구축 표현을 사용하지 않음.
- Reable 홈페이지: Tiptap 이미지 확장과 NestJS 관계·업로드·일괄 조회 개선으로 정리. 현재 제거된 최적화를 운영 성과로 표현하지 않음.
- NZT: GRESB·Excel·다국어·공통 UI 테스트를 중심으로 정리. SSR 및 측정 수치는 검증 문서에 원문 보존.
- 뉴비즈스타트: 재직 기간과 경력 항목 유지. 반복 이슈 감소 등 측정하지 않은 효과는 지원 업무 설명으로 조정.
- Skills: 직접 구현·실무 사용/유지보수·개인 프로젝트·학습/실습 구분. 회사 Nx와 개인 Turborepo 구분.

## 프로젝트 페이지와 기능

| 프로젝트 | 로컬 경로 |
|---|---|
| 실시간 협업 코딩 에디터 | /collaborative-code-editor |
| SAVEE | /savee |
| 온라인 강의·부트캠프 학습 플랫폼 | /online-learning-platform |
| Reable Homepage · 콘텐츠 편집기 | /reable-content-editor |
| NZT | /nzt |

- 기존 `[projectId]` 라우트를 실제 데이터 조회에 연결. 제목·설명 메타데이터, 미존재 ID의 notFound, 공통 버튼을 통한 목록 복귀 추가.
- 예시 데이터·중복 ID 제거. 기존 `/test2` 예시 페이지는 404 처리.
- 기존 sitemap에 5개 상세 URL 추가. 배포 설정이나 도메인 설정 자체는 변경하지 않음.
- 프로젝트 개발 기간은 확정 근거가 없어 새 날짜를 생성하지 않았다. 담당 범위는 각 상세에 명시.
- 공개 권한이 확인되지 않은 회사 화면은 쓰지 않고 기존 개인 사이트 아이콘을 대표 이미지로 사용. 실제 제품 화면을 뜻하지 않는다.

## 디자인 유지 검증

- 기존 수정 파일의 styled template 내용이 HEAD와 동일함을 비교.
- 새로운 상세 컴포넌트만 기존 페이지 컨테이너와 이력서 내용/섹션/Chip 레이아웃 규칙을 그대로 재사용. Heading·Paragraph·List·Chip·Button은 기존 @repo/ui 사용.
- Git HEAD를 /tmp의 개인 앱 복사본으로 실행해 수정 전후를 비교. 작업 트리나 회사 파일은 되돌리거나 수정하지 않음.
- Chromium 1440px 및 390px에서 두 앱의 목록/이력 페이지 정상 렌더링(200), 런타임 pageerror 없음.
- 다크 테마에서 h1/h2/본문/main/footer/목록 링크의 글꼴·크기·굵기·행간·색상·배경·padding·gap·transition 등 선택한 computed style이 전후 동일.
- 라이트 테마에서도 두 앱·두 화면 폭의 주요 computed style이 전후 동일. 데스크톱 목록의 hover 상태도 비교.
- 5개 상세를 두 화면 크기에서 실제 목록 클릭으로 열고 목록 복귀 버튼 검증. 본문 8개 섹션 확인. 가로 overflow 없음.
- 미존재 ID 및 test/test2/test3 URL의 실제 404 응답 확인. 두 앱의 `/docs/career-review/career-evidence.md` 요청도 404 확인. sitemap 200 및 5개 프로젝트 URL 포함 확인.
- 내용·태그·이미지 교체에 따른 줄바꿈과 페이지 길이 변화는 있다. 텍스트 변경이므로 전체 픽셀 동일성을 주장하지 않는다.
- 임시 스크린샷·브라우저 결과: `/tmp/bududak-career-qa/`. 모바일 상세와 데스크톱 목록 스크린샷을 직접 확인했다.

## 타입·lint·테스트·빌드 결과

| 검사 | 결과 |
|---|---|
| pnpm --filter resume check-types | 통과 |
| pnpm --filter portfolio check-types | 통과 |
| pnpm --filter @repo/ui test -- --runInBand | 4 suites, 24 tests, 7 snapshots 통과 |
| 수정·신규 TS/TSX 파일 ESLint --max-warnings 0 | 두 앱 모두 통과 |
| 앱 전체 src ESLint --max-warnings 0 | 앱마다 기존 src/types/styled.d.ts의 no-empty-object-type 경고 1개로 실패. 해당 파일 무변경 |
| 기존 pnpm --filter resume lint | 기존 next lint --max-warnings 스크립트가 현재 Next.js에서 실패. 동일 스크립트를 가진 portfolio도 설정상 동일 문제. 설정 변경 없이 ESLint 직접 실행 |
| 최초 eslint . 실행 | 기존 ignore 설정이 .next까지 검사하여 생성물 경고 발생. 실제 소스 범위를 src로 한정해 별도 재검사 |
| Next.js 프로덕션 빌드 | resume·portfolio 모두 성공, 기본 Turbopack 사용 |
| git diff --check | 통과 |
| 출력 파일 추적(.nft.json) | 두 앱에서 career-review 문서 참조 없음 |

빌드는 설치된 Node 22.23.1로 `node apps/<app>/node_modules/next/dist/bin/next build apps/<app>`를 실행했다. 기본 셸 Node 20.15.1을 변경하거나 의존성을 설치하지 않았다. 기존 pnpm wrapper의 Corepack 캐시 쓰기 제한은 설치된 Next CLI 직접 실행으로 해결했다. baseline-browser-mapping 데이터 노후 경고는 있었으나 빌드에 실패하지 않았다.

## 보류·미검증 및 배포 전 확인

- LCP/CLS·다운로드 시간·50% 단축, SSR/prefetch, Nx 도입 책임, Lambda 월별 스케줄, 납품/거래·대규모 운영 효과는 verification-needed.md 참조.
- 회사 제품별 정확한 개발 기간, 공개 가능한 실제 스크린샷은 추가 자료 필요.
- 외부 배포·운영 사이트 반영·실제 호스팅 도메인 매핑은 실행/검증하지 않았다. 별도 승인 후 확인한다.
- Safari·Firefox 및 실제 모바일 기기, 모든 중간 화면 폭의 시각 검증은 미실시. 1440/390 Chromium 검증과 스타일 무변경 검사를 수행했다.
- 문서는 public 및 앱 import 경로 밖에 있다. 저장소를 외부 공개할 경우 문서의 공개 범위를 별도 검토한다.
- 기존 전체 lint 스크립트/타입 선언 경고 정리는 이번 콘텐츠 범위 밖으로 남긴다. 이번 변경 파일 lint는 통과했다.

## 생성 문서

- career-evidence.md: 프로젝트별 역할·기술·커밋·상대 소스 경로·확인 결과·지원서 문장.
- verification-needed.md: 미검증 원문, 추가 탐색 결과 및 사용자에게 필요한 확인.
- portfolio-change-summary.md: 변경 목록·검증·남은 사항.

## 수정 및 신규 파일

- `apps/portfolio/src/app/[projectId]/page.tsx`
- `apps/portfolio/src/app/sitemap.ts`
- `apps/portfolio/src/app/test2/page.tsx`
- `apps/portfolio/src/components/project/ProjectDetail.tsx`
- `apps/portfolio/src/constants/projects.ts`
- `apps/portfolio/src/constants/stacks.ts`
- `apps/resume/src/components/ProfileContents.tsx`
- `apps/resume/src/components/SkillSection/SkillContents.tsx`
- `apps/resume/src/components/WorkExperienceSection/CodeCamp.tsx`
- `apps/resume/src/components/WorkExperienceSection/EanTec.tsx`
- `apps/resume/src/components/WorkExperienceSection/Newbizstart.tsx`
- `apps/resume/src/components/WorkExperienceSection/WorkExperienceContents.tsx`
- `apps/resume/src/constants/index.ts`
- `docs/career-review/career-evidence.md`
- `docs/career-review/portfolio-change-summary.md`
- `docs/career-review/verification-needed.md`

## 3차 수정: 범용성 및 공개 문체 검토 (2026-10-28)

이번 작업 시작 시 사용자가 복원한 메인 소개와 Skills를 기준으로 비교했다. 앞선 2차 변경과 구분하며, 이번 공개 소스 변경은 다음 6개 파일이다.

- `apps/portfolio/src/constants/projects.ts`: 목록 소개, 카드 설명, 상세 5개의 담당 업무·문제·선택·구현·결과·회고.
- `apps/portfolio/src/app/layout.tsx`: 검색 설명 문구.
- `apps/resume/src/components/WorkExperienceSection/CodeCamp.tsx`
- `apps/resume/src/components/WorkExperienceSection/EanTec.tsx`
- `apps/resume/src/components/WorkExperienceSection/Newbizstart.tsx`
- `apps/resume/src/components/WorkExperienceSection/WorkExperienceContents.tsx`

내부 문서는 이 파일과 `verification-needed.md`를 갱신했다.

### 방향과 대표 문장

- “학습 경험과 서비스 운영에서 다룬 구현·문제 해결 사례” → “서비스 개발과 운영에서 해결한 문제와 구현 과정”. 목록 전체가 교육 경험 중심으로 보이지 않도록 수정했다. 교육 프로젝트 자체의 구체적인 구현 설명은 유지했다.
- “코드 수신 구분, 편집 잠금, 리렌더링 버그 및 채널 연결 처리의 변경 이력이 있습니다.” → “편집 잠금 상태에 따라 입력 가능 여부를 반영하고, 코드 편집 중 발생한 리렌더링 버그를 수정했습니다.” 수신 코드 구분과 채널 처리는 해당 구현 문단에서 각각 설명한다.
- “게시글별 반복 조회를 일괄 조회와 메모리 내 참조로 바꾸는 개선 이력이 있습니다.” → “게시글 일괄 복제에서 원본을 항목마다 조회하던 방식을 일괄 조회와 Map 참조로 바꿨습니다.”
- “보고서 기능과 언어 처리의 변경 기록, 버튼·카드 테스트 파일 작성 기록이 있습니다.” → “건물을 연결해 GRESB 리포트를 작성·수정·삭제하고, 선택한 언어로 Excel 보고서를 요청할 수 있도록 구현했습니다.” 테스트 설명은 별도 문단에 유지했다.

### 전체 검토 범위

두 앱의 공개 소스 및 공유 UI를 확인했다. 메인 소개·헤더, 경력 요약, 회사별 업무, 프로젝트 카드와 상세 5개, 스택 목록, Skills 8개 카테고리, 기술적 회고, 메타데이터와 상세별 검색 설명, 교육·연락처·오류 화면을 검토했다. 메인 소개와 Skills는 원문을 그대로 보존했다. 프로젝트 상세의 검색 설명은 수정한 프로젝트 description을 그대로 사용한다.

개인 기여나 측정 근거가 불명확한 성과는 새로 추가하지 않았다. Skills의 사용자 복원 문구에 남은 검증 대상은 `verification-needed.md`에 별도로 명시했다.

### 검증 결과

- `pnpm --filter resume check-types`, `pnpm --filter portfolio check-types`: 통과.
- 두 앱 Next.js 프로덕션 빌드: 통과 (Node 22.23.1). 기존 baseline-browser-mapping 데이터 갱신 경고는 남아 있다.
- 이번 변경 6개 공개 파일에 ESLint `--max-warnings 0`: 통과.
- 작업 시작 시점의 78개 파일 스냅샷과 비교: 공개 소스 변경은 위 6개뿐. TypeScript AST 비교에서 문자열·JSX 텍스트 외 구조 변화 없음. Skills·메인 소개·스타일·공유 UI·구성 파일 동일.
- 브라우저 1440px·390px에서 두 앱 메인과 상세 5개, 총 14개 화면 확인: 모두 HTTP 200, 가로 넘침 없음. 상세별 검색 설명 존재, 목록 복귀 정상, 금지한 분석 보고서식 표현 없음.
- 스타일, 폰트, 색상, 반응형 규칙, 간격, 애니메이션, 컴포넌트 구조, 라우팅, 프로젝트 수 및 모노레포·배포 구성은 변경하지 않았다. 문장 길이에 따른 자연스러운 줄바꿈은 달라질 수 있다.
- 회사 저장소 수정, 원격 push, 배포는 하지 않았다.

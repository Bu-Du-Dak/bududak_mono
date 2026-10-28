# 경력·프로젝트 근거

2026-10-28 / 작업 브랜치: codex/portfolio-career-evidence

이 문서는 후속 이력서·자기소개서 작성 자료다. 앱에서 import하지 않고 public·배포용 디렉터리 밖에 보관한다. 회사 소스 원문·내부 URL·인증 정보·고객 데이터는 복사하지 않는다. 아래 경로는 각 저장소 기준 상대 경로이며 공개 페이지에는 내부 경로나 커밋을 싣지 않는다. 저장소 자체의 공개 여부는 별도 검토 대상이다.

## 검증 방법과 경계

- 로컬 현재 소스, Git 전체 로컬 refs의 작성자·커밋·일부 diff를 읽었다. 원격 최신 상태는 fetch하지 않았다.
- Bu-Du-Dak/Hong JaeHoon 작성자 기록을 개인 기여 근거로 사용했다. 커밋 수를 기여율이나 설계 책임으로 해석하지 않는다.
- 회사 저장소에서 수정·설치·빌드·서비스 실행을 하지 않았다.
- 기능의 존재, 개인 구현 이력, 운영 성과 및 측정 수치는 각각 별개다.
- 개발 시작·종료일은 확정 자료가 없어 프로젝트 페이지에서 생략했다. 회사 재직 기간은 사용자의 기존 경력 기록을 유지했다.
- 아래 회고 문장은 기술적 접근을 정리한 초안이며, 실제로 측정하지 않은 효과를 성과로 삼지 않는다.

## 딩코 — 실시간 협업 코딩 에디터

- 저장소: web-editor-frontend
- 목적: 멘토와 수강생이 코드·실행 결과를 공유하며 음성·영상으로 소통하는 학습 도구.
- 기술: Next.js, React, TypeScript, Monaco, Socket.IO, AgoraRTC, Context, REST, Emotion.
- 개인 기여: 코드 수신/입력 구분, 편집 잠금 변경, 리렌더링 버그 수정, Agora 클라이언트 생성·채널 처리.
- 문제 해결: 방 단위 이벤트와 입력 출처를 구분하고 편집권 상태를 입력 제한에 반영. REST 실행·제출 결과를 화면에 연결.
- 커밋: 5fd1e67, c1af03a, 3b14caa, 4278cad, 0ad157a, 069a90d.
- 파일: `src/components/codeEditor/codeEditor.container.tsx`, `src/components/codeEditor/codeEditor.presenter.tsx`, `src/components/editorContents/LiveCamContents/video/videoCaller.tsx`.
- 확인된 결과: 코드 동기화·편집 잠금·실행 결과·참가자 이벤트 처리 구현 및 변경 이력.
- 검증 필요: 동시 접속 규모, 지연 측정, 운영 안정성, 거래/납품, Micro Frontend 통합 구조.
- 공개 반영: resume 딩코 첫 프로젝트 및 `/collaborative-code-editor` 상세. debounce·편집권 제어를 명시하고 CRDT/OT·무충돌 동시 편집 주장은 사용하지 않음.
- 활용 문장: “온라인 협업 학습 도구에서 코드 동기화와 편집권 제어를 구현하고, AgoraRTC 참가자·채널 처리로 음성·영상 소통을 연결했습니다.”

## EAN 테크놀로지 / Reable — SAVEE

- 저장소: ems-admin
- 목적: 에너지 사용량·설비 상태를 조회·분석하는 운영 서비스.
- 기술: Next.js App Router, TypeScript, TanStack Query, Context/Zustand, styled-components, Highcharts, REST, GitHub Actions.
- 개인 기여: 선행 필터 준비에 따른 API 호출, 로딩·오류 처리, 비교 필터·초기 데이터, 테이블 설정 메모이제이션·표시 데이터 분리, 동적 import 및 번들 분석 도구, 배포 workflow 일부.
- 커밋: fd4a871f3, 716d9e4f6, 609d6e0e6, b6d36b8ce, a0fec9081, 23d6d0c7e.
- 파일: `src/app/_components/Equipment/Monitoring/components/GraphInfo.tsx`, `src/app/_contexts/equipment/use-filter-data.ts`, `src/app/_components/Equipment/Management/components/ManagementTable.tsx`, `src/app/_components/Dashboard/index.tsx`, `.github/workflows/CD.prod.yml`.
- 확인된 결과: 선행 데이터 조건에 따른 요청 실행과 렌더링 관련 구조 변경. a0fec9081/b6d36b8ce가 현재 HEAD의 선행 커밋임을 확인.
- 검증 필요: 동일 조건의 렌더링·번들 크기 전후 측정, 전체 CI/CD 구축 책임과 운영 효과.
- 제외: AI 챗봇 핵심 로직 및 공통 가상화 테이블은 다른 작성자 기록. 본인 대표 성과에 포함하지 않음.
- 공개 반영: 현 회사 첫 프로젝트와 `/savee`. 수치 없이 실제 변경과 책임을 기술.
- 활용 문장: “복잡한 설비 비교 화면에서 필터 준비와 API 호출 순서를 정리하고, 테이블 설정 메모이제이션과 차트 코드 분할을 적용했습니다.”

## 딩코 — 온라인 강의·부트캠프 학습 플랫폼

- 저장소: co_work_user, co_work_admin, codecamp_online_frontend, codecamp_online_frontend_user.
- 목적: 수강생의 강의·노트·첨삭 확인과 운영자의 자료·수강 현황 관리.
- 기술: Next.js Pages Router, TypeScript, Apollo/GraphQL, Recoil, Emotion, Toast UI Editor, Vimeo. 스택은 관련 서비스 범위이며 전부 직접 도입했다는 의미가 아니다.
- 개인 기여: 노트 검색, 무료 강의 수강, 모바일 결제 완료 화면 일부, 자료·이미지 등록 오류, 수강시간 관리, 첨삭 일정.
- 커밋: co_work_user 6206ef9/9ad8b44/b032ea3; co_work_admin 65abc77; codecamp_online_frontend 7377660/6edfc37; codecamp_online_frontend_user a47ca58.
- 파일: co_work_user `user/src/components/units/mypage/mynote/`; co_work_admin `front-end/pages/course/`; codecamp_online_frontend `src/components/mainComponents/user/`; codecamp_online_frontend_user `src/components/mainComponents/commons/dashBoard/g-rating/`.
- 확인된 결과: 검색·수강·일정 표시 및 운영 기능 변경 기록. b032ea3는 결제 완료 presenter의 작은 변경으로 전체 결제 구축 증거가 아님.
- 검증 필요: 제품별 정확한 개발 기간, 뉴비즈스타트/딩코 업무 구분, Vimeo 진도율·Auth Guard 직접 구현 범위, 성능 및 학습 지표.
- 공개 반영: resume 딩코 두 번째 프로젝트 및 `/online-learning-platform`. 사용자·운영자 양쪽 경험 강조, 단독 구축 표현 제외.
- 활용 문장: “강의 노트와 수강·첨삭 정보, 자료 등록을 다루며 학습자와 운영자 양쪽의 사용 흐름을 연결했습니다.”

## EAN 테크놀로지 / Reable — 홈페이지·콘텐츠 편집기

- 저장소: reable-front-mono
- 목적: 홈페이지 콘텐츠 작성·관리와 게시글/업로드 처리.
- 기술: Next.js, TypeScript, Tiptap, NestJS, TypeORM, TanStack Query, Tailwind, AWS S3, Nx/pnpm.
- 개인 기여: NodeView·이미지 링크 확장, 게시글·이미지 관계, 미참조 업로드 정리, 일괄 복제 반복 조회 개선.
- 커밋: 9ad2317a, de9da951, ad7ecbf3, 6e562af1, 75eeb866, 088eaab3, 6dbc6691.
- 파일: `apps/homepage/frontend/src/components/Admin/Resources/Write/TextEditor/Extensions/ImageWithId.ts`, 같은 디렉터리 `shouldUpdate.ts`; `apps/homepage/backend/src/apis/posts/posts.service.ts`, `apps/homepage/backend/src/apis/s3/s3.service.ts`.
- 확인된 결과: 이미지 NodeView·href 확장, 관계 기반 미참조 업로드 정리 서비스, 원본 일괄 조회와 Map 참조를 사용한 복제 변경.
- 주의: 과거 shouldUpdate 연결은 현재 ImageWithId에서 유지되지 않음. 게시글 삭제 함수의 즉시 업로드 삭제 호출은 주석 상태이며 별도 정리 서비스와 구분해야 함.
- 검증 필요: Lambda 월별 스케줄 실제 설정·실행 결과, 최적화 유지 여부와 전후 측정.
- 공개 반영: `/reable-content-editor`, resume 두 번째 프로젝트. 현재 운영 중인 NodeView 최적화나 월 1회 Lambda 운영을 단정하지 않음.
- 활용 문장: “Tiptap 이미지 편집 기능과 콘텐츠 관계 모델을 함께 다루고, 미참조 업로드 정리 및 일괄 복제 조회 개선까지 구현했습니다.”

## EAN 테크놀로지 / Reable — NZT

- 저장소: netzero-front, netzero-admin. netzero-backend는 연동 구조 참고이며 개인 백엔드 기여로 주장하지 않음.
- 목적: 탄소 배출량 분석, GRESB 및 Excel 보고서 작성·다운로드.
- 기술: Next.js, TypeScript, Apollo/GraphQL, React Query, Zustand, Emotion, Highcharts, Jest/Testing Library.
- 개인 기여: GRESB 입력·수정·삭제·건물 연결, Excel API 및 언어 처리, 분석 화면, 버튼·카드 테스트. 관리 앱에서 유틸리티 검증 변경 이력도 존재.
- 커밋: 648661ab, 193930c3; 관련 기록 375e4b83, 57649cec, 675e56a3, de71addb; netzero-admin 044b846.
- 파일: `src/commons/buttons/buttonComponent.spec.tsx`, `src/commons/card/cardComponent.spec.tsx`, `src/components/report/download/cards/excelReport/excelReport.container.tsx`.
- 확인된 결과: 공통 UI 테스트 파일 작성, 보고서 요청의 언어 처리 변경. 회사 테스트는 실행하지 않았으므로 현재 통과 상태를 의미하지 않음.
- 검증 필요: SSR 전환·prefetch·LCP/CLS·다운로드 시간, 200개 문항 규모 및 설계 책임.
- 공개 반영: `/nzt`, resume 보고서·테스트 경험. 기존 수치 원문은 verification-needed.md에 보존.
- 활용 문장: “탄소관리 리포트와 Excel 다운로드의 데이터·언어 흐름을 연결하고, 공통 버튼·카드 테스트를 작성했습니다.”

## 모노레포 기여 구분

- 개인 bududak_mono: Turborepo/pnpm, resume·portfolio·blog 및 @repo/ui·설정 패키지.
- 회사 reable-front-mono: Nx/pnpm. 초기 887c9072, 구조 변경 b0d881f9 및 7a106db9는 다른 작성자 기록. 본인의 공통 UI 변경 기록은 4d3c2b9b, 13990e49, f5d437fd 등 존재.
- 회사 CI에서 Nx affected를 사용하나 본인의 전체 설계·도입 책임은 미확인. “모노레포 환경 개발·공통 패키지 활용/수정”으로 공개 표현.
- 50% 단축 수치, 설계 책임과 측정 방법은 별도 확인 필요.

## 기타 저장소·경력 보존

- codecamp-02: Next.js/Apollo 및 React Native 학습·실습. 상용 모바일 경력으로 확대하지 않고 Skills의 학습 수준으로 표시.
- ZECO_FE: React/Amplify 기반 건축 결과 관리. 식별된 본인 기여가 없어 신규 대표 프로젝트로 추가하지 않음.
- netzero-backend: Express/MySQL/Redis API·배치. 본인 기여 미확인.
- bems: React/TypeScript, Query, 차트·API 분리 구조. .git/package.json이 없어 원본 이력 확인 필요.
- 뉴비즈스타트: 기존 경력과 기간을 유지. 교육 운영 지원·학습 화면 경험을 보존하되 정량적 개선과 단독 책임은 추가하지 않음.

## 지원서의 핵심 경쟁력

1. 학습 도메인과 실시간 협업: 입력 출처·편집권·음성/영상 이벤트를 함께 다룬 경험.
2. 복잡한 화면의 문제 해결: 선행 데이터, 필터, 로딩·오류, 테이블·차트의 구조 개선.
3. 기능 전반의 이해: 콘텐츠 편집 UI와 데이터 관계·업로드 관리·조회 개선까지 연결.
4. 근거 기반 소통: 개인 변경 기록과 팀 시스템, 구현 결과와 측정 성과를 구분.

AI 모델·음성 인식·발음 평가·CRDT/OT·상용 React Native·학습 게임화 구현은 확인된 경력으로 추가하지 않았다.

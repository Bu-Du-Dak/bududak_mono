import {
  CODE_EDITOR_STACKS,
  SAVEE_STACKS,
  DING_CO_STACKS,
  REABLE_HOMEPAGE_STACKS,
  NZT_STACKS,
} from "./stacks";

export type ProjectSection = { title: string; paragraphs: string[] };
export type Project = {
  id: string;
  title: string;
  company: string;
  role: string;
  description: string;
  imgUrl: string;
  thumbUrl?: string;
  tags: string[];
  sections: ProjectSection[];
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "collaborative-code-editor",
    title: "실시간 협업 코딩 에디터",
    company: "딩코 · 2022.11 ~ 2023.03 · 단독 개발",
    role: "설계부터 상용화까지 단독 개발 (코드 동기화, 편집 권한, 실행 결과, 음성·영상 통화)",
    description:
      "멘토와 수강생이 같은 코드를 보며 문제를 푸는 협업 에디터를 한 달 만에 단독으로 개발해 자사 교육 과정에 적용하고 외부 교육 서비스에 판매했습니다.",
    imgUrl: "/algorithm.webp",
    thumbUrl: "/algorithm-thumb.webp",
    sections: [
      {
        title: "프로젝트 소개",
        paragraphs: [
          "멘토와 수강생이 코드를 공유하며 함께 문제를 해결하는 온라인 협업 도구입니다. 편집기에서 코드를 작성하고 실행 결과를 확인하면서 음성·영상으로 피드백을 주고받을 수 있습니다.",
          "Next.js 13, Monaco Editor, Socket.IO, AgoraRTC로 한 달 일정 안에 단독 개발했고, 자사 교육 과정에 적용한 뒤 외부 교육 서비스에 판매했습니다.",
        ],
      },
      {
        title: "동시 편집 방식 선택: 200ms 소프트 락",
        paragraphs: [
          "여러 사용자가 같은 코드를 편집할 때 충돌을 어떻게 다룰지가 핵심이었습니다. OT·CRDT는 서버 상태 관리와 충돌 해결 비용이 커서 한 달 일정에 맞지 않는다고 판단했습니다.",
          "대신 한 사용자가 입력하는 동안 200ms 동안 편집을 잠그는 소프트 락 방식을 선택했습니다. 입력 중에는 상대방 입력에 throttle을 걸고, 지금 편집 중인 사용자를 화면에 표시해 충돌 자체를 줄였습니다.",
        ],
      },
      {
        title: "코드가 반복 전송되는 문제 해결",
        paragraphs: [
          "상대방이 작성한 코드를 편집기에 반영할 때, 이를 새 입력으로 처리하면 서버로 다시 전송되어 무한 루프가 생겼습니다. 서버에서 받은 변경과 사용자가 직접 입력한 변경을 구분해 재전송 루프를 제거했습니다.",
          "편집 권한을 가진 사용자의 입력만 공유하고, 키를 누를 때마다 전송하지 않도록 debounce로 전송 빈도를 조절했습니다. 편집 잠금 상태를 입력 제한에 반영하고, 편집 중 발생한 리렌더링 버그도 수정했습니다.",
        ],
      },
      {
        title: "서비스 연동과 통화",
        paragraphs: [
          "다른 서비스에서 에디터로 진입할 때 전달하는 문제·유저·방 ID와 토큰을 AES로 암호화해 파라미터 노출을 막았습니다.",
          "코드 실행·제출 REST API를 연결해 실행 결과를 편집기에서 확인하도록 했습니다. AgoraRTC 클라이언트와 통화 채널을 연결하고, 참가자의 미디어 공개·중단·퇴장에 맞춰 영상과 음성을 표시하거나 정리했습니다.",
        ],
      },
      {
        title: "결과 및 경험",
        paragraphs: [
          "한 달 만에 자사 교육 과정에 적용했고, 외부 교육 서비스에 판매되었습니다.",
          "완벽한 동시 편집보다 일정 안에 안정적으로 동작하는 방식을 고르는 것이 중요했습니다. debounce는 전송 횟수를 줄이지만 상대방에게 코드가 전달되는 시점에도 영향을 주기 때문에, 전송 주기와 잠금 시간, 편집 권한을 함께 조정해야 했습니다.",
        ],
      },
    ],
    tags: CODE_EDITOR_STACKS,
  },
  {
    id: "savee",
    title: "SAVEE",
    company: "EAN테크놀로지 · 2024.07 ~ 현재 · Frontend Lead",
    role: "BEMS 관리자 웹 프론트엔드 리드 (모니터링·리포트, 성능 개선, 가상관제점 편집기)",
    description:
      "건물 에너지 관리 시스템(BEMS) 관리자 웹을 개발했습니다. SSR과 prefetch로 초기 렌더링을 1.3초 줄이고, 평균 번들을 878KB에서 728KB로 줄였습니다.",
    imgUrl: "/savee.webp",
    thumbUrl: "/savee-thumb.webp",
    sections: [
      {
        title: "프로젝트 소개",
        paragraphs: [
          "건물의 에너지 사용량과 설비 상태를 조회·분석하는 BEMS 관리자 웹입니다. 사용자는 설비와 기간을 선택해 데이터를 비교하고, 리포트를 내려받아 운영 상태를 확인합니다.",
          "Next.js 14, React Query, Zustand, Zod, Highcharts, socket.io를 사용했고, 프론트엔드 리드로 개발과 코드 리뷰를 맡고 있습니다.",
        ],
      },
      {
        title: "초기 렌더링 1.3초 단축",
        paragraphs: [
          "기존에는 CSR 구조라 첫 화면 그래프가 클라이언트에서 데이터를 받은 뒤에야 그려졌고, LCP가 3.5초 이상이었습니다.",
          "첫 화면 그래프의 초기 데이터를 서버에서 React Query로 prefetch하고 hydration으로 넘기도록 바꿔, 초기 렌더링을 1.3초 줄였습니다.",
        ],
      },
      {
        title: "평균 번들 878KB → 728KB",
        paragraphs: [
          "bundle analyzer로 확인해 보니 차트와 PDF 생성 라이브러리가 대부분의 페이지 번들에 포함되어 있었습니다.",
          "Highcharts는 dynamic import로 분리하고, 쓰지 않던 Highstock은 제거했습니다. jsPDF·html2canvas는 리포트를 만드는 시점에만 불러오도록 바꿨습니다.",
          "그 결과 76개 라우트의 평균 First Load JS가 878KB에서 728KB로, 가장 큰 라우트는 1.2MB에서 1.04MB로 줄었습니다.",
        ],
      },
      {
        title: "React Query 도입과 중복 요청 제거",
        paragraphs: [
          "useEffect로 흩어져 있던 데이터 요청을 React Query로 옮겼습니다. 설비 용도 → 설비 → 관제점 조회가 서로 의존하는데, 값이 준비되기 전에도 그래프 요청이 나가 진입 시 같은 요청이 2회 발생했습니다.",
          "상위 조회가 성공한 뒤에만 하위 조회가 실행되도록 enabled로 연결해 그래프 요청을 1회로 줄였고, 요청 상태에 따라 그래프·로딩·오류 화면을 구분해 표시했습니다.",
          "테이블이 다시 렌더링될 때 컬럼과 행 확장 설정을 매번 생성하던 부분은 메모이제이션하고, 표시용 데이터 가공 코드를 렌더링 로직에서 분리했습니다.",
        ],
      },
      {
        title: "리포트 다운로드와 진행 상태",
        paragraphs: [
          "리포트 다운로드는 필요한 API가 모두 끝날 때까지 4초 이상 기다려야 했습니다. 리포트에 들어갈 데이터를 다운로드 전에 prefetchQuery로 미리 요청해 대기 시간을 3초 이내로 줄였습니다.",
          "리포트 생성 진행 상태는 폴링 대신 WebSocket으로 진행률을 받아 표시하고, 생성 중에도 취소할 수 있도록 했습니다.",
        ],
      },
      {
        title: "가상관제점 정의식 편집기와 접근성",
        paragraphs: [
          "가상관제점 정의식 편집기를 전담했습니다. 정의식을 {관제점, 연산자} 배열로 규격화하고, Zod와 React Hook Form으로 항목 단위 검증을 적용했습니다. 긴 설비 등록 폼은 한 화면 안에서 단계별로 입력하도록 제안해 입력 부담을 줄였습니다.",
          "버튼·아이콘의 터치 영역과 색 대비를 개선해 Lighthouse 접근성 점수를 70점에서 90점으로 올렸습니다.",
        ],
      },
      {
        title: "결과 및 경험",
        paragraphs: [
          "초기 렌더링 1.3초 단축, 평균 번들 150KB 감소, 리포트 대기 3초 이내, 진입 시 그래프 요청 2회 → 1회, 접근성 70 → 90점을 달성했습니다. GitHub Actions로 운영 배포 워크플로도 추가했습니다.",
          "여러 API를 사용하는 화면에서는 각 요청뿐 아니라 요청 사이의 의존 관계도 살펴야 했습니다. 렌더링 시점은 SSR로, 요청 순서는 enabled로, 코드 로딩은 dynamic import로 다루면서 문제마다 맞는 도구를 골랐습니다.",
        ],
      },
    ],
    tags: SAVEE_STACKS,
  },
  {
    id: "online-learning-platform",
    title: "온라인 강의·부트캠프 학습 플랫폼",
    company: "뉴비즈스타트 → 딩코(고용승계) · 2021.10 ~ 2023.01",
    role: "강의 플랫폼·커뮤니티·백오피스 프론트엔드 개발, 로그인·결제·배포 자동화",
    description:
      "강의 플랫폼과 커뮤니티, 운영자 백오피스를 개발했습니다. 소셜 로그인과 결제, 해외 접속자 타임존 오류와 Apollo 캐시 갱신 문제를 다루고, Jenkins·Docker로 배포를 자동화했습니다.",
    imgUrl: "/lecture.webp",
    thumbUrl: "/lecture-thumb.webp",
    sections: [
      {
        title: "프로젝트 소개",
        paragraphs: [
          "오프라인 코딩 부트캠프를 온라인으로 확장한 교육 서비스입니다. 수강생은 강의를 듣고 노트와 첨삭 일정을 확인하며, 운영자는 별도의 관리 화면에서 강의 자료와 수강 현황을 관리합니다.",
          "뉴비즈스타트에서 시작해 2022.05 고용승계로 딩코에서 이어서 개발했습니다.",
        ],
      },
      {
        title: "로그인·결제·커뮤니티",
        paragraphs: [
          "소셜 로그인과 토큰 재발급 흐름, 아임포트 결제(웹·모바일), 커뮤니티 기능을 개발했습니다.",
          "해외 접속자에게 시간이 잘못 표시되던 타임존 오류와, Apollo 캐시 때문에 데이터가 갱신되지 않던 문제를 해결했습니다.",
        ],
      },
      {
        title: "수강생 화면 개발",
        paragraphs: [
          "복습할 때 필요한 내용을 찾을 수 있도록 강의별 노트와 전체 노트 목록의 검색 로직을 수정했습니다. 무료 강의 수강 처리와 모바일 결제 완료 화면도 개선했습니다.",
          "다음 첨삭 일정을 확인할 수 있도록 기존 Apollo/GraphQL 조회에 필요한 필드를 추가하고 화면에 표시했습니다.",
        ],
      },
      {
        title: "운영자 화면과 배포",
        paragraphs: [
          "강의 자료를 등록하고 이미지를 처리하는 과정에서 발생한 오류를 수정하고, 수강시간 관리 기능을 개발했습니다.",
          "Jenkins와 Docker로 개발·운영 환경 배포를 자동화했습니다.",
        ],
      },
      {
        title: "결과 및 경험",
        paragraphs: [
          "수강생은 노트를 검색하고 다음 첨삭 일정을 확인할 수 있게 되었고, 운영자는 강의 자료와 수강시간을 관리할 수 있게 되었습니다.",
          "같은 데이터를 사용하더라도 수강생과 운영자에게 필요한 정보가 달라, 각 화면의 목적에 맞춰 조회 항목과 표시 내용을 구분했습니다. 수강생의 오류 상황을 직접 재현해 원인을 찾고 공유하는 습관도 이때 생겼습니다.",
        ],
      },
    ],
    tags: DING_CO_STACKS,
  },
  {
    id: "reable-content-editor",
    title: "Reable Homepage · 콘텐츠 편집기",
    company: "EAN테크놀로지 · 2025.06 ~ 2026.07 · 풀스택",
    role: "Nx 모노레포 도입 주도, Tiptap 에디터, NestJS API와 파일 관리 구조 설계",
    description:
      "백엔드 인력 없이 프론트엔드 2명이 회사 홈페이지와 어드민 CMS를 API까지 개발했습니다. Nx 모노레포 도입을 주도하고, Tiptap 에디터와 S3 파일 라이프사이클을 설계했습니다.",
    imgUrl: "/editor.webp",
    thumbUrl: "/editor-thumb.webp",
    sections: [
      {
        title: "프로젝트 소개",
        paragraphs: [
          "회사 홈페이지와 게시글을 작성·관리하는 어드민 CMS입니다. 백엔드 인력이 없어 프론트엔드 2명이 Next.js 15 화면과 NestJS·TypeORM·PostgreSQL API를 함께 개발했습니다.",
        ],
      },
      {
        title: "Nx 모노레포 도입",
        paragraphs: [
          "팀 회의를 리드하며 Turborepo와 Nx를 비교했고, 변경된 프로젝트만 빌드·테스트하는 affected 기능이 강점인 Nx를 선택했습니다.",
          "공통 컴포넌트를 패키지로 묶어 새 프로젝트마다 공통 컴포넌트를 다시 만드는 시간을 줄였고, 디자인·기획이 바뀌어도 컴포넌트 하나만 고치면 되도록 했습니다.",
        ],
      },
      {
        title: "Tiptap 에디터",
        paragraphs: [
          "표·임베드·이미지 리사이즈·캡션을 커스텀 노드와 NodeView로 구현하고, 작성자가 이미지에 링크와 속성을 지정할 수 있도록 했습니다.",
          "입력할 때마다 이미지 NodeView가 다시 그려지던 문제는 shouldUpdate로 해결했습니다. 글 작성에는 자동 임시 저장과 토스트 알림을 제안해 구현했습니다.",
        ],
      },
      {
        title: "파일 라이프사이클 설계",
        paragraphs: [
          "게시글을 복제하면 이미지 하나를 여러 글이 참조할 수 있어, 게시글과 이미지를 중간 테이블로 연결했습니다. 글을 저장하면 연결을 만들고, 이미지를 삭제하면 연결을 끊습니다.",
          "매월 정기 배치로 어떤 게시글과도 연결이 남지 않은 파일만 S3에서 정리해, 다른 글에서 쓰는 파일이 지워지지 않도록 했습니다.",
        ],
      },
      {
        title: "일괄 복제, 방문 분석, SEO",
        paragraphs: [
          "여러 게시글을 복제할 때 원본을 게시글마다 다시 조회하던 것을 한 번에 조회해 Map으로 관리하도록 바꿔, 조회 쿼리를 N회에서 1회로 줄였습니다.",
          "방문 분석을 tracker → 수집·집계 API → Recharts 대시보드까지 직접 구축했습니다.",
          "솔루션 페이지를 generateStaticParams로 정적 생성하고 메타데이터와 sitemap을 적용해 Lighthouse SEO 100점을 받았습니다.",
        ],
      },
      {
        title: "결과 및 경험",
        paragraphs: [
          "백엔드 인력 없이 홈페이지와 CMS를 API까지 완성했고, Nx 공통 패키지 덕분에 새 프로젝트에서 공통 컴포넌트를 다시 만드는 시간이 줄었습니다.",
          "편집기에서 이미지를 제거하는 것과 저장소에서 파일을 삭제하는 것은 별개의 작업이었습니다. 다른 게시글에서 사용하는 파일을 지우지 않도록 참조 관계를 데이터 구조로 먼저 정한 뒤, 화면의 편집 기능부터 백엔드의 파일 관리까지 연결해 개발했습니다.",
        ],
      },
    ],
    tags: REABLE_HOMEPAGE_STACKS,
  },
  {
    id: "nzt",
    title: "NZT",
    company: "EAN테크놀로지 · 2023.05 ~ 2025.04",
    role: "GRESB 보고서 입력 핵심 담당, REST → GraphQL 전환, 다국어·해외 버전, 테스트 환경 도입",
    description:
      "탄소중립 관리 SaaS에서 GRESB 보고서 20개 이상 섹션의 입력을 담당했습니다. REST를 GraphQL로 전환하고, ko/en 다국어와 싱가포르 버전, Jest 테스트 환경을 도입했습니다.",
    imgUrl: "/NZTHome.png",
    sections: [
      {
        title: "프로젝트 소개",
        paragraphs: [
          "건물의 탄소 배출량을 분석하고 ESG 보고서를 관리하는 탄소중립 관리 SaaS입니다. Next.js 13, Apollo Client(GraphQL), Zustand, Highcharts, i18next, Jest를 사용했습니다.",
        ],
      },
      {
        title: "GRESB 보고서 입력",
        paragraphs: [
          "글로벌 ESG 평가인 GRESB 보고서의 20개 이상 섹션에 대해 입력 폼과 API 연동을 맡았고, 수십 차례의 QA에 대응했습니다.",
          "리포트를 작성·수정·삭제하고 건물 데이터를 연결하는 기능을 개발했고, Excel 보고서 다운로드 요청에는 사용자가 선택한 언어를 반영했습니다.",
        ],
      },
      {
        title: "REST → GraphQL 전환",
        paragraphs: [
          "화면마다 필요한 필드가 달랐지만 REST 응답은 고정되어 있었습니다. GraphQL로 전환해 화면별로 필요한 필드만 요청하도록 바꾸고, Codegen으로 타입을 자동 생성했습니다.",
        ],
      },
      {
        title: "다국어와 해외 버전, 테스트",
        paragraphs: [
          "words.json 사전으로 전 화면에 ko/en을 적용하고 싱가포르 버전을 출시했습니다. 화면에 표시되는 언어뿐 아니라 서버에 전달하는 값까지 함께 확인했습니다.",
          "Jest와 Testing Library를 도입하고, 여러 화면에서 쓰는 버튼·카드 같은 공통 컴포넌트에 단위 테스트를 작성했습니다.",
        ],
      },
      {
        title: "결과 및 경험",
        paragraphs: [
          "GRESB 보고서 입력을 완성하고 싱가포르 버전을 출시했으며, 팀에 Jest 테스트 환경을 도입했습니다.",
          "공통 UI는 작은 변경도 여러 화면에 영향을 줄 수 있어, 사용자 동작을 테스트로 확인하는 기준을 함께 마련했습니다.",
        ],
      },
    ],
    tags: NZT_STACKS,
  },
];

export const PROJECTS = [
  {
    title: "주요 프로젝트",
    description: "서비스 개발과 운영에서 해결한 문제와 구현 과정",
    items: FEATURED_PROJECTS,
  },
];

export function getProject(id: string) {
  return FEATURED_PROJECTS.find((project) => project.id === id);
}

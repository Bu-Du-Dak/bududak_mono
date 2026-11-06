import SectionWithTitle from "../commons/SectionWithTitle";
import SkillItem from "./SkillItem";
export const SkillConstant = [
  {
    title: "Overall",
    itemArr: [
      "기능이 복잡할수록 명확한 인터페이스와 즉각적인 피드백을 중요하게 봅니다. 긴 설비 등록 폼을 단계별 입력으로 바꾸고, 글 작성에 자동 임시 저장과 토스트 알림을 넣은 것도 같은 이유입니다.",
      "최신 기술보다 일정, 팀 상황, 유지보수 비용에 맞는 선택을 우선합니다. 한 달 일정의 협업 에디터에서는 OT·CRDT 대신 200ms 소프트 락을 선택했습니다.",
      "필요하면 영역을 넘어 직접 해결합니다. 백엔드 인력이 없던 CMS 프로젝트에서 NestJS API와 S3 파일 관리 구조까지 설계했습니다.",
    ],
  },
  {
    title: "JavaScript / TypeScript",
    itemArr: [
      "복잡한 입력을 타입과 스키마로 먼저 규격화합니다. 가상관제점 정의식을 {관제점, 연산자} 배열로 정의하고 Zod·React Hook Form으로 항목 단위 검증을 적용했습니다.",
      "GraphQL Codegen으로 API 응답 타입을 자동 생성해 화면과 서버 사이의 타입 불일치를 줄였습니다.",
      "반복 작업은 Node.js 스크립트로 자동화합니다. 개인 모노레포에서 이슈 → 브랜치 → PR 생성과 PR 전 테스트 실행을 스크립트로 만들었습니다.",
    ],
  },
  {
    title: "Web",
    itemArr: [
      "버튼·아이콘 터치 영역과 색 대비를 개선해 Lighthouse 접근성 점수를 70점에서 90점으로 올렸습니다.",
      "generateStaticParams 정적 생성과 메타데이터·sitemap 적용으로 회사 홈페이지의 Lighthouse SEO 100점을 받았습니다.",
      "아임포트 웹·모바일 결제, 해외 접속자 타임존 오류처럼 실사용 환경에서만 드러나는 문제를 직접 재현하고 해결했습니다.",
      "styled-components, Emotion, Tailwind CSS를 프로젝트 성격에 맞게 선택해 사용해 왔습니다.",
    ],
  },
  {
    title: "React / Next.js",
    itemArr: [
      "useEffect 기반 요청을 React Query로 옮기고, 의존하는 조회를 enabled로 연결해 진입 시 그래프 요청을 2회에서 1회로 줄였습니다.",
      "CSR 대시보드에 SSR과 React Query prefetch·hydration을 적용해 초기 렌더링을 1.3초 줄였고, 홈페이지는 SSG로 정적 생성했습니다.",
      "bundle analyzer로 번들을 분석해 dynamic import와 지연 로드로 평균 First Load JS를 878KB에서 728KB로 줄였습니다.",
    ],
  },
  {
    title: "Architecture",
    itemArr: [
      "팀 회의에서 Turborepo와 비교해 affected 빌드가 강점인 Nx 모노레포 도입을 주도했습니다. 공통 컴포넌트를 패키지로 묶어 새 프로젝트마다 다시 만드는 시간을 줄였습니다.",
      "공통 컴포넌트를 한 곳에서 관리해 디자인·기획이 바뀌어도 컴포넌트 하나만 고치면 되도록 했습니다.",
      "게시글 복제로 이미지 하나를 여러 글이 참조하는 구조를 중간 테이블로 설계하고, 연결이 남지 않은 파일만 정기 배치로 정리했습니다.",
    ],
  },
  {
    title: "Testing",
    itemArr: [
      "NZT에 Jest·Testing Library 테스트 환경을 도입하고 공통 컴포넌트 단위 테스트를 작성했습니다.",
      "개인 모노레포에서 공통 UI 단위 테스트 24개(테스트 대상 기준 라인 커버리지 97.7%)와 Playwright E2E를 운영합니다.",
      "테스트는 커버리지 수치보다 여러 화면에 영향을 주는 공통 UI를 안심하고 고치기 위한 수단이라고 생각합니다.",
    ],
  },
  {
    title: "DevOps",
    itemArr: [
      "GitHub Actions로 SAVEE 운영 배포 워크플로를 추가했고, 딩코에서는 Jenkins·Docker로 개발·운영 배포를 자동화했습니다.",
      "Nx affected로 변경된 프로젝트만 빌드·테스트하도록 구성했습니다.",
      "AWS S3에 업로드 파일을 저장하고, 사용하지 않는 파일을 정기 배치로 정리했습니다.",
    ],
  },
  {
    title: "Communication",
    itemArr: [
      "소통에서는 부드러움보다 명확함을 우선하며, 의견 자체보다 왜 그렇게 생각하는지를 함께 공유합니다.",
      "PR 리뷰에서 반복되는 지적은 노션 컨벤션 문서에 반영해 같은 이야기를 반복하지 않도록 합니다.",
      "받은 디자인은 Storybook으로 먼저 만들어 개발 전에 기획·디자인과 확인합니다.",
      "프론트엔드 리드(최대 약 10명, 현재 5명)를 맡으며, 좋은 결과는 개인의 역량보다 의사소통 구조와 타이밍에서 나온다는 것을 배웠습니다.",
    ],
  },
];

export default function SkillContents() {
  return (
    <SectionWithTitle title={"Skills"}>
      {SkillConstant.map((e) => (
        <SkillItem key={e.title} title={e.title} itemArr={e.itemArr} />
      ))}
    </SectionWithTitle>
  );
}

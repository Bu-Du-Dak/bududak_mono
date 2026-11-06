import SectionWithTitle from "../commons/SectionWithTitle";
import SkillItem from "./SkillItem";
// 성과와 사례는 Work Experience에 두고, 여기서는 기술 키워드만 정리한다.
export const SkillConstant = [
  {
    title: "Core",
    itemArr: ["TypeScript, React 19, Next.js 15 (App / Pages Router)"],
  },
  {
    title: "State & Data",
    itemArr: [
      "React Query, Zustand, Apollo Client(GraphQL), React Hook Form, Zod",
    ],
  },
  {
    title: "Realtime & Editor",
    itemArr: ["Socket.IO, Monaco Editor, Tiptap, AgoraRTC"],
  },
  {
    title: "UI & Visualization",
    itemArr: ["Highcharts, Recharts, Tailwind CSS, styled-components, Storybook"],
  },
  {
    title: "Test & DevOps",
    itemArr: [
      "Jest, Testing Library, Playwright, MSW",
      "Nx·Turborepo, Docker, GitHub Actions, Jenkins",
    ],
  },
  {
    title: "Backend",
    itemArr: ["NestJS, TypeORM, PostgreSQL, AWS S3"],
  },
  {
    title: "Working Style",
    itemArr: [
      "최신 기술보다 일정, 팀 상황, 유지보수 비용에 맞는 선택을 우선합니다.",
      "소통에서는 부드러움보다 명확함을 우선하며, 의견보다 그렇게 생각한 이유를 함께 공유합니다.",
      "Claude, ChatGPT를 개발 업무에 활용해 반복 작업을 줄입니다.",
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

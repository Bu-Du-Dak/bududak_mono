import { List, ListItem } from "@repo/ui/components/List";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import {
  ChipsWrapper,
  ResumeDescriptionContainer,
  ResumeDescriptionItem,
} from "../commons/commons";
import { Chip } from "@repo/ui/components/Chip";
import {
  SAVEE_STACKS,
  REABLE_HOMEPAGE_STACKS,
  NZT_STACKS,
} from "../../constants";
import Anchor from "@repo/ui/typography/Anchor";

export default function EanTec() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Heading level={3}>프론트엔드 리드</Heading>
        <Paragraph>
          프론트엔드 팀(최대 약 10명, 현재 5명)을 리드하며 기술 선택과 코드
          리뷰, 기획·디자인 협업을 맡고 있습니다.
        </Paragraph>
        <List>
          <ListItem>
            Nx 모노레포 도입 주도: 팀 회의에서 Turborepo와 비교해 affected
            빌드가 강점인 Nx를 선택했습니다. 공통 컴포넌트를 패키지로 묶어 새
            프로젝트마다 공통 컴포넌트를 다시 만드는 시간을 줄이고, 디자인·기획이
            바뀌어도 컴포넌트 하나만 고치면 되도록 했습니다.
          </ListItem>
          <ListItem>
            코드 리뷰와 컨벤션: PR 리뷰를 거쳐 머지하고, 리뷰에서 반복되는
            지적은 노션 컨벤션 문서에 반영했습니다.
          </ListItem>
          <ListItem>
            기획·디자인 협업: 긴 설비 등록 폼은 한 화면 안의 단계별 입력으로,
            CMS 글 작성에는 자동 임시 저장과 토스트 알림을 제안·구현했습니다.
            받은 디자인은 Storybook으로 먼저 만들어 개발 전에 확인했습니다.
          </ListItem>
        </List>
      </ResumeDescriptionItem>
      <ResumeDescriptionItem>
        <Anchor
          href="https://portfolio.bududak.com/savee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>SAVEE</Heading>
        </Anchor>
        <Paragraph>
          건물 에너지 관리 시스템(BEMS) 관리자 웹의 모니터링·리포트 화면을
          개발하고, 렌더링과 번들 성능을 개선했습니다. (2024.07 ~ 현재)
        </Paragraph>
        <List>
          <ListItem>
            초기 렌더링 1.3초 단축: 첫 화면 그래프의 초기 데이터를 SSR과 React
            Query prefetch·hydration으로 서버에서 준비했습니다. (기존 CSR
            구조에서 LCP 3.5초 이상)
          </ListItem>
          <ListItem>
            평균 번들 878KB → 728KB: bundle analyzer로 분석해 Highcharts
            dynamic import, 쓰지 않던 Highstock 제거, jsPDF·html2canvas를 쓰는
            시점에 로드했습니다. (76개 라우트 평균 First Load JS)
          </ListItem>
          <ListItem>
            리포트 다운로드 대기 4초 이상 → 3초 이내: 리포트에 들어갈 API를
            다운로드 전에 prefetchQuery로 미리 요청했습니다.
          </ListItem>
          <ListItem>
            중복 요청 제거: useEffect 기반 요청을 React Query로 옮기고, 설비
            용도 → 설비 → 관제점 조회를 enabled로 연결해 진입 시 그래프 요청을
            2회에서 1회로 줄였습니다.
          </ListItem>
          <ListItem>
            접근성 점수 70 → 90점: 버튼·아이콘 터치 영역과 색 대비를
            개선했습니다. (Lighthouse)
          </ListItem>
          <ListItem>
            가상관제점 정의식 편집기 전담: 정의식을 {"{관제점, 연산자}"} 배열로
            규격화하고 Zod·React Hook Form으로 항목 단위 검증을 적용했습니다.
          </ListItem>
          <ListItem>
            리포트 생성 진행 상태: 폴링 대신 WebSocket으로 진행률을 받고, 생성
            중 취소를 지원했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {SAVEE_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
      <ResumeDescriptionItem>
        <Anchor
          href="https://portfolio.bududak.com/reable-content-editor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>Reable Homepage · 콘텐츠 편집기</Heading>
        </Anchor>
        <Paragraph>
          백엔드 인력 없이 프론트엔드 2명이 회사 홈페이지와 어드민 CMS를 API까지
          개발했습니다. (2025.06 ~ 2026.07)
        </Paragraph>
        <List>
          <ListItem>
            Tiptap 에디터: 표·임베드·이미지 리사이즈·캡션을 커스텀 노드와
            NodeView로 구현하고, shouldUpdate로 입력할 때마다 이미지 NodeView가
            다시 그려지던 문제를 해결했습니다.
          </ListItem>
          <ListItem>
            파일 라이프사이클: 게시글 복제로 이미지 하나를 여러 글이 참조할 수
            있어 중간 테이블로 설계했습니다. 글 저장 시 연결을 만들고 이미지 삭제
            시 연결을 끊으며, 매월 정기 배치로 연결이 남지 않은 파일만 S3에서
            정리했습니다.
          </ListItem>
          <ListItem>
            일괄 복제 쿼리 N회 → 1회: 원본을 한 번에 조회해 Map으로
            관리했습니다.
          </ListItem>
          <ListItem>
            방문 분석 직접 구축: tracker → 수집·집계 API → Recharts 대시보드를
            만들었습니다.
          </ListItem>
          <ListItem>
            정적 생성과 SEO: 솔루션 페이지를 generateStaticParams로 정적 생성하고
            메타데이터·sitemap을 적용해 Lighthouse SEO 100점을 받았습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {REABLE_HOMEPAGE_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
      <ResumeDescriptionItem>
        <Anchor
          href="https://portfolio.bududak.com/nzt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>NZT</Heading>
        </Anchor>
        <Paragraph>
          건물의 탄소 배출량을 관리하는 탄소중립 SaaS에서 GRESB 보고서와 다국어,
          테스트 환경을 담당했습니다. (2023.05 ~ 2025.04)
        </Paragraph>
        <List>
          <ListItem>
            GRESB 보고서 입력 핵심 담당: 글로벌 ESG 평가 보고서 20개 이상 섹션의
            입력 폼과 API 연동을 맡고 수십 차례 QA에 대응했습니다.
          </ListItem>
          <ListItem>
            REST → GraphQL 전환: 화면별로 필요한 필드만 요청하도록 바꾸고
            Codegen으로 타입을 자동 생성했습니다.
          </ListItem>
          <ListItem>
            다국어와 해외 버전: words.json 사전으로 전 화면에 ko/en을 적용하고
            싱가포르 버전을 출시했습니다.
          </ListItem>
          <ListItem>
            테스트 환경 도입: Jest·Testing Library를 도입하고 공통 컴포넌트 단위
            테스트를 작성했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {NZT_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
    </ResumeDescriptionContainer>
  );
}

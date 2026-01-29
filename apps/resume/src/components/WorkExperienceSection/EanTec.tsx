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
  NZT_STACKS,
  REABLE_HOMEPAGE_STACKS,
  SAVEE_STACKS,
} from "../../constants";

export default function EanTec() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Heading level={3}>Reable Homepage</Heading>
        <Paragraph>
          공식 홈페이지와 블로그 기능을 개발하며, 콘텐츠 작성 경험을 위한 Tiptap
          기반 에디터 기능을 확장했습니다. 운영 과정에서 발생하는 리소스 누수
          문제를 정리하고 자동화로 관리 비용을 줄였습니다.
        </Paragraph>
        <List>
          <ListItem>
            NodeView update로 발생하던 불필요한 리렌더링을 줄이기 위해, 변경
            영향이 있는 경우에만 DOM 업데이트가 발생하도록 개선했습니다.
          </ListItem>
          <ListItem>
            드래그 영역이 아닌 한 줄 전체에 스타일이 적용되던 문제를 해결하기
            위해, selection 범위를 계산해 선택 영역에만 스타일이 적용되도록
            구현했습니다.
          </ListItem>
          <ListItem>
            이미지 노드 스키마를 커스터마이징해 href 등 확장 속성을 지원하고,
            콘텐츠 작성 흐름에 맞게 에디터 기능을 확장했습니다.
          </ListItem>
          <ListItem>
            게시글 수정 시 기존 이미지가 S3에 잔존하는 문제를 파악하고,
            게시글-이미지 관계를 기준으로 미사용 이미지를 판별할 수 있도록
            구조를 설계했습니다.
          </ListItem>
          <ListItem>
            Lambda 스케줄러로 월 1회 미사용 이미지를 자동 삭제하도록 구성해
            스토리지 누적을 예방했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {REABLE_HOMEPAGE_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>

      <ResumeDescriptionItem>
        <Heading level={3}>SAVEE</Heading>
        <Paragraph>
          콘텐츠 운영 과정에서 데이터 정합성과 관리 편의성을 높이기 위해,
          수정·삭제 흐름의 예외 케이스를 정리하고 운영 이슈가 재발하지 않도록
          개선했습니다.
        </Paragraph>
        <List>
          <ListItem>
            콘텐츠 수정·삭제 과정에서 발생하는 엣지 케이스를 정리해, 운영
            과정에서도 일관된 상태가 유지되도록 처리 흐름을 개선했습니다.
          </ListItem>
          <ListItem>
            사용자 입력과 서버 상태 간 불일치가 발생하지 않도록 저장/반영
            타이밍을 정리하고 예외 처리를 보강했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {SAVEE_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>

      <ResumeDescriptionItem>
        <Heading level={3}>NZT</Heading>
        <Paragraph>
          복잡한 연산과 다수의 그래프로 초기 로딩이 길었던 레거시 서비스를
          분석하고, Next.js 기반 SSR 전환과 성능 개선을 담당했습니다.
        </Paragraph>
        <List>
          <ListItem>
            CSR 구조를 SSR로 전환해 서버에서 데이터를 사전 계산·렌더링하도록
            개선하고, LCP 3.5s → 1.8s, CLS 0.10 → 0.06으로 지표를 개선했습니다.
          </ListItem>
          <ListItem>
            React Query prefetch를 적용해 리포트 다운로드 시간을 2,000ms →
            900ms로 단축했습니다.
          </ListItem>
          <ListItem>
            200개 이상 문항 관리 요구에 Compound Components 패턴을 적용하고,
            문항 속성을 JSON 스키마로 분리해 변경 대응이 빠른 구조를
            구성했습니다.
          </ListItem>
          <ListItem>
            하이드레이션 불일치를 예방하기 위해 서버 값을 props로 주입하고,
            Context 초기값 동기화 및 참조 안정화로 안정성과 성능을 확보했습니다.
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

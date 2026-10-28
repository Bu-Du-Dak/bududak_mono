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
        <Anchor
          href="https://portfolio.bududak.com/savee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>SAVEE</Heading>
        </Anchor>
        <Paragraph>
          건물의 에너지 사용량과 설비 상태를 확인하는 서비스에서 모니터링과 운영
          화면을 개발했습니다. 그래프 조회 오류를 다루고, 테이블의 반복 계산과
          차트 코드 로딩 방식을 개선했습니다.
        </Paragraph>
        <List>
          <ListItem>
            그래프에 필요한 필터 값을 먼저 불러온 뒤 API를 요청하도록 수정하고,
            로딩 상태와 요청 오류를 구분해 표시했습니다.
          </ListItem>
          <ListItem>
            설비 비교 필터의 초기값을 설정하고, 선택한 조건으로 그래프를
            조회하도록 수정했습니다.
          </ListItem>
          <ListItem>
            테이블이 다시 렌더링될 때 같은 설정을 매번 계산하지 않도록 컬럼·행
            확장 설정을 메모이제이션하고, 표시할 데이터를 가공하는 코드를
            분리했습니다.
          </ListItem>
          <ListItem>
            대시보드·차트 코드를 동적 import로 분할하고, 번들 구성을 점검할 수
            있도록 분석 도구를 추가했습니다.
          </ListItem>
          <ListItem>
            GitHub Actions로 운영 환경에 배포하는 워크플로를 추가했습니다.
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
          회사 홈페이지의 게시글 작성·관리 기능을 개발했습니다. 이미지 편집
          기능을 확장하고, 게시글에서 사용하는 이미지 파일을 관리하는 백엔드
          기능도 함께 구현했습니다.
        </Paragraph>
        <List>
          <ListItem>
            Nx·pnpm 모노레포의 공통 UI를 활용해 Next.js와 NestJS 기능을 함께
            개발하고, Tiptap 이미지 NodeView를 확장해 이미지 링크와 속성을
            편집할 수 있도록 했습니다.
          </ListItem>
          <ListItem>
            게시글과 이미지의 사용 관계를 관리하고, 어떤 게시글에서도 사용하지
            않는 업로드 파일을 판별해 정리하는 기능을 구현했습니다.
          </ListItem>
          <ListItem>
            여러 게시글을 복제할 때 원본을 매번 조회하지 않도록 한 번에
            불러오고, Map에서 찾아 사용하도록 변경했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {REABLE_HOMEPAGE_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
      <ResumeDescriptionItem>
        <Heading level={3}>NZT</Heading>
        <Paragraph>
          건물의 탄소 배출량을 관리하는 서비스에서 GRESB 리포트 작성과 Excel
          보고서 다운로드 기능을 개발했습니다. 다국어 연동과 공통 UI 테스트도
          담당했습니다.
        </Paragraph>
        <List>
          <ListItem>
            GRESB 리포트의 작성·수정·삭제와 건물 연결 기능을 개발하고, 관련
            화면의 예외 상황을 수정했습니다.
          </ListItem>
          <ListItem>
            Excel 보고서 API를 연결하고, 사용자가 선택한 언어로 다운로드를
            요청하도록 구현했습니다.
          </ListItem>
          <ListItem>
            분석 화면을 수정하고, 공통 버튼과 카드의 표시·동작을 확인하는
            Jest·Testing Library 테스트를 작성했습니다.
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

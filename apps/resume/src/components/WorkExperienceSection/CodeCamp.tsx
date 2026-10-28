import { List, ListItem } from "@repo/ui/components/List";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import {
  ChipsWrapper,
  ResumeDescriptionContainer,
  ResumeDescriptionItem,
} from "../commons/commons";
import { Chip } from "@repo/ui/components/Chip";
import { CODE_EDITOR_STACKS, DING_CO_STACKS } from "../../constants";

export default function CodeCamp() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Heading level={3}>실시간 협업 코딩 에디터</Heading>
        <Paragraph>
          수강생과 멘토가 함께 코드를 작성할 수 있는 실시간 협업 코드 에디터를
          개발했습니다. 핵심 기능 설계부터 구현까지 전반을 담당했으며, 결과물은
          구름 에듀에 소스 코드 형태로 판매되었습니다.
        </Paragraph>
        <List>
          <ListItem>
            Socket.IO 기반 동시 편집 기능을 구현해 코드 공유 및 피드백 지연
            문제를 해결했습니다.
          </ListItem>
          <ListItem>
            AgoraRTC를 연동해 음성·화상 통신을 지원하고 실시간 소통 환경을
            구현했습니다.
          </ListItem>
          <ListItem>
            알고리즘 해설 영상을 에디터 내부에서 바로 확인할 수 있도록 구성해
            학습 흐름이 끊기지 않도록 개선했습니다.
          </ListItem>
          <ListItem>
            Micro Frontend 구조로 서비스를 분리해 트래픽 증가 상황에서도
            독립적으로 확장 가능한 구조를 구성했습니다.
          </ListItem>
          <ListItem>
            실행 결과를 실시간으로 확인할 수 있는 콘솔 기능을 추가해 디버깅
            경험을 개선했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {CODE_EDITOR_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>

      <ResumeDescriptionItem>
        <Heading level={3}>온라인 동영상 강의 플랫폼</Heading>
        <Paragraph>
          오프라인 강의를 온라인에서도 수강할 수 있도록 동영상 강의 플랫폼을
          개발했습니다. 결제·시청 사용자 페이지와 영상·수강생 관리 어드민
          페이지를 중심으로 구현했습니다.
        </Paragraph>
        <List>
          <ListItem>
            Toast UI Editor로 강의별 노트 기능을 제공해 수강생이 학습 내용을
            정리하고 복습할 수 있도록 구성했습니다.
          </ListItem>
          <ListItem>
            Vimeo API와 Hook으로 진도율을 추적해 학습 현황을 명확히 파악할 수
            있도록 개선했습니다.
          </ListItem>
          <ListItem>
            Lazy Loading을 적용해 상세 페이지 초기 로딩을 개선하고 대용량
            이미지로 인한 성능 저하를 줄였습니다.
          </ListItem>
          <ListItem>
            결제 상태 기반 Auth Guard를 구현해 비인가 접근을 차단했습니다.
          </ListItem>
          <ListItem>
            페이지 단위 코드 스플리팅을 적용해 초기 진입 시 체감 성능을
            개선했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {DING_CO_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
    </ResumeDescriptionContainer>
  );
}

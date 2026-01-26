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
        <Heading level={3}>실시간 협업 코딩 에디터 개발</Heading>
        <Paragraph>
          수강생·멘토가 함께 코드를 작성할 수 있는 양방향 실시간 코드 에디터
          개발을 담당했습니다. 백엔드 1인, 프론트엔드 1인으로 구성된 소규모
          프로젝트로 진행되었으며, 완성 후 구름 에듀에 소스 코드를 판매했습니다.
        </Paragraph>
        <List>
          <ListItem>
            Socket.IO 기반 실시간 동시 편집 기능을 도입해, 수강생과 멘토 간 코드
            공유 및 피드백 지연 문제를 해결했습니다.
          </ListItem>
          <ListItem>
            AgoraRTC를 연동해 음성·화상 통신을 지원하면서, 오프라인 강의에
            가까운 실시간 소통 환경을 구현했습니다.
          </ListItem>
          <ListItem>
            알고리즘 문제 해설 영상을 에디터 내부에서 바로 확인할 수 있도록
            구성해, 학습 흐름이 끊기지 않는 문제 풀이 경험을 제공했습니다.
          </ListItem>
          <ListItem>
            에디터 서비스를 Micro Frontend 구조로 분리하면서, 트래픽 증가
            상황에서도 안정적으로 서비스가 운영되도록 개선했습니다.
          </ListItem>
          <ListItem>
            알고리즘 실행 결과를 실시간으로 확인할 수 있는 콘솔 기능을 추가해,
            수강생의 디버깅 과정이 수월해지도록 했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {CODE_EDITOR_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>

      <ResumeDescriptionItem>
        <Heading level={3}>온라인 동영상 강의 플랫폼 개발</Heading>
        <Paragraph>
          기존 오프라인 강의를 온라인에서도 수강할 수 있도록 동영상 강의
          플랫폼을 개발했습니다. 수강생 관리와 영상·강의 자료 등록을 위한 어드민
          페이지, 강의를 결제하고 시청할 수 있는 사용자 페이지로 구성되었으며,
          영상 등록·재생 기능과 수강생 관리 중심의 어드민 페이지 개발을 주로
          담당했습니다.
        </Paragraph>
        <List>
          <ListItem>
            Toast UI Editor를 활용해 강의별 노트 기능을 제공하며, 수강생이 학습
            내용을 정리하고 복습하기 쉬운 환경을 만들었습니다.
          </ListItem>
          <ListItem>
            Vimeo API와 Hook을 활용해 강의 진도율을 추적함으로써, 수강생의 학습
            현황을 보다 명확하게 파악할 수 있도록 했습니다.
          </ListItem>
          <ListItem>
            Lazy Loading을 적용해 상세 페이지의 초기 로딩 속도를 개선하고,
            대용량 이미지로 인한 성능 저하를 줄였습니다.
          </ListItem>
          <ListItem>
            수강 결제 상태를 기준으로 접근을 제어하는 Auth Guard를 구현해,
            비인가 사용자의 접근을 차단하고 서비스 보안을 강화했습니다.
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

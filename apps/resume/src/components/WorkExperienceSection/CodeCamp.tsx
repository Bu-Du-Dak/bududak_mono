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
import Anchor from "@repo/ui/typography/Anchor";

export default function CodeCamp() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Anchor
          href="https://portfolio.bududak.com/collaborative-code-editor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>실시간 협업 코딩 에디터</Heading>
        </Anchor>
        <Paragraph>
          멘토와 수강생이 같은 코드를 보며 문제를 풀 수 있는 협업 편집기를
          개발했습니다. 코드 공유와 편집 권한을 구현하고 실행 결과와 음성·영상
          통화를 연결했습니다.
        </Paragraph>
        <List>
          <ListItem>
            Monaco 편집기에 Socket.IO를 연결해 같은 방에서 코드를 공유하도록
            구현했습니다. 직접 입력한 코드와 서버에서 받은 코드를 구분해
            재전송을 방지했습니다.
          </ListItem>
          <ListItem>
            편집 권한에 따라 입력을 허용하거나 잠그고, 키를 누를 때마다 코드를
            전송하지 않도록 debounce를 적용했습니다.
          </ListItem>
          <ListItem>
            코드 실행·제출 REST API를 연결해 작성한 코드의 실행 결과를
            편집기에서 확인할 수 있도록 했습니다.
          </ListItem>
          <ListItem>
            AgoraRTC 클라이언트와 통화 채널을 연결하고, 참가자 이벤트에 맞춰
            영상과 음성을 표시하거나 정리했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {CODE_EDITOR_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
      <ResumeDescriptionItem>
        <Anchor
          href="https://portfolio.bududak.com/online-learning-platform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>온라인 강의·부트캠프 학습 플랫폼</Heading>
        </Anchor>
        <Paragraph>
          수강생이 강의를 듣고 복습하는 화면과 운영자가 강의를 관리하는 화면을
          개발했습니다. 노트 검색과 첨삭 일정 확인, 강의 자료와 수강시간 관리
          기능을 개선했습니다.
        </Paragraph>
        <List>
          <ListItem>
            강의별·전체 노트 목록에서 필요한 내용을 찾도록 검색 로직을 수정하고,
            무료 강의 수강 처리를 개선했습니다.
          </ListItem>
          <ListItem>
            운영자가 강의 자료를 등록할 때 발생하는 이미지 처리 오류를
            수정했습니다. 수강생의 모바일 결제 완료 화면도 일부 개선했습니다.
          </ListItem>
          <ListItem>
            운영자의 수강시간 관리 기능을 개발하고, 수강생이 다음 첨삭 일정을
            확인할 수 있도록 조회 항목과 화면 표시를 보완했습니다.
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

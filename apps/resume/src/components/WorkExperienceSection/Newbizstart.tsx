import { List, ListItem } from "@repo/ui/components/List";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import {
  ChipsWrapper,
  ResumeDescriptionContainer,
  ResumeDescriptionItem,
} from "../commons/commons";
import { Chip } from "@repo/ui/components/Chip";
import { NEW_BIZ_START_STACKS } from "../../constants";
import Anchor from "@repo/ui/typography/Anchor";

export default function NewBizStart() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Anchor
          href="https://portfolio.bududak.com/online-learning-platform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>온라인 부트캠프 플랫폼</Heading>
        </Anchor>
        <Paragraph>
          오프라인 코딩 부트캠프 운영을 지원하며, 온라인 부트캠프 플랫폼으로
          확장하는 과정의 프론트엔드 개발을 담당했습니다. 수강생이 겪는 오류를
          재현하고 학습 화면의 사용성을 개선했습니다.
        </Paragraph>
        <List>
          <ListItem>
            수강생의 오류 상황을 재현해 원인을 파악하고, 해결 방법을 정리해
            공유했습니다.
          </ListItem>
          <ListItem>
            수강 중 불편을 주는 UI·UX 문제를 정리하고 학습 화면을 개선했습니다.
          </ListItem>
          <ListItem>
            오프라인 중심 운영 흐름을 온라인 서비스로 전환하는 과정에서 강의
            콘텐츠와 학습 도구가 자연스럽게 연결되도록 화면과 기능을
            구성했습니다.
          </ListItem>
          <ListItem>고용승계에 따라 ㈜딩코로 소속이 변경되었습니다.</ListItem>
        </List>
        <ChipsWrapper>
          {NEW_BIZ_START_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
    </ResumeDescriptionContainer>
  );
}

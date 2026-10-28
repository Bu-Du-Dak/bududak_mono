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

export default function NewBizStart() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Heading level={3}>온라인 부트캠프 플랫폼</Heading>
        <Paragraph>
          오프라인 코딩 부트캠프 운영을 지원하며, 온라인 부트캠프 플랫폼으로
          확장하는 과정의 프론트엔드 개발을 담당했습니다. 운영 환경에서 발생하는
          문제를 빠르게 정리하고 개선으로 연결했습니다.
        </Paragraph>
        <List>
          <ListItem>
            수강생의 에러 상황을 재현·정리해 원인을 파악하고 해결 방법을 공유해
            동일 이슈의 반복 발생을 줄였습니다.
          </ListItem>
          <ListItem>
            학습 흐름을 방해하는 UI·UX 문제를 정리해 개선하며 온라인 학습 경험을
            안정화했습니다.
          </ListItem>
          <ListItem>
            오프라인 중심 운영 흐름을 온라인 서비스로 전환하는 과정에서 강의
            콘텐츠와 학습 도구가 자연스럽게 연결되도록 화면과 기능을
            구성했습니다.
          </ListItem>
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

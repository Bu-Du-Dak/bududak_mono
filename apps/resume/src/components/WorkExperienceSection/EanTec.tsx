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
        <Paragraph>홈페이지</Paragraph>
        <List>
          <ListItem>
            Socket.IO 기반 실시간 동시 편집 기능을 도입해, 수강생과 멘토 간 코드
            공유 및 피드백 지연 문제를 해결했습니다.
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
        <Paragraph>홈페이지</Paragraph>
        <List>
          <ListItem>
            Socket.IO 기반 실시간 동시 편집 기능을 도입해, 수강생과 멘토 간 코드
            공유 및 피드백 지연 문제를 해결했습니다.
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
        <Paragraph>기존 React로 구성된 프로젝트를 NextJs로</Paragraph>
        <List>
          <ListItem>
            Socket.IO 기반 실시간 동시 편집 기능을 도입해, 수강생과 멘토 간 코드
            공유 및 피드백 지연 문제를 해결했습니다.
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

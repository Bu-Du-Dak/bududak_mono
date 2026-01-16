"use client";
import { List, ListItem } from "@repo/ui/components/List";

import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import {
  ChipsWrapper,
  ResumeDescriptionContainer,
  ResumeDescriptionItem,
} from "../commons/commons";
import { Chip } from "@repo/ui/components/Chip";

export default function NewBizStart() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Heading level={3}>문제의 원인 파악을 바탕으로 해결합니다.</Heading>
        <Paragraph>
          코드캠프에서 오전에는 메인 강사님을 보조하는 역할로 수강생들의 문제
          해결을 돕고, 오후에는 온라인 부트캠프 플랫폼 서비스를 개발하였습니다.
        </Paragraph>
        <List>
          <ListItem>
            에러 발생 시 상황을 정리해 원인을 파악하고 해결, 동일한 에러의
            재발을 방지하기 위해 수강생들과 공유
          </ListItem>
          <ListItem>
            에러 발생 시 상황을 정리해 원인을 파악하고 해결, 동일한 에러의
            재발을 방지하기 위해 수강생들과 공유
          </ListItem>
        </List>
        <ChipsWrapper>
          <Chip>TypeScript</Chip>
          <Chip>Next.js</Chip>
          <Chip>React Context</Chip>
          <Chip>Emotion</Chip>
          <Chip>Antd</Chip>
          <Chip>GraphQL</Chip>
          <Chip>Apollo Client</Chip>
          <Chip>AWS EC2</Chip>
          <Chip>AWS S3</Chip>
          <Chip>Toast UI Editor</Chip>
          <Chip>Vimeo</Chip>
        </ChipsWrapper>
      </ResumeDescriptionItem>
    </ResumeDescriptionContainer>
  );
}

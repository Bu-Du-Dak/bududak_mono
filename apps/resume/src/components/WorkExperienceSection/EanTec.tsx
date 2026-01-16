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

export default function EanTec() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Heading level={3}></Heading>
        <Paragraph>홈페이지</Paragraph>
        <List>
          <ListItem>
            Socket.IO 기반 실시간 동시 편집 기능을 도입해, 수강생과 멘토 간 코드
            공유 및 피드백 지연 문제를 해결했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          <Chip>TypeScript</Chip>
          <Chip>Next.js</Chip>
          <Chip>React Context</Chip>
          <Chip>Tanstack ReactQuery</Chip>
          <Chip>TailWind</Chip>
          <Chip>RestAPI</Chip>
          <Chip>Axios</Chip>
          <Chip>AWS EC2</Chip>
          <Chip>AWS S3</Chip>
        </ChipsWrapper>
      </ResumeDescriptionItem>
      <ResumeDescriptionItem>
        <Heading level={3}></Heading>
        <Paragraph>기존 React로 구성된 프로젝트를 NextJs로</Paragraph>
        <List>
          <ListItem>
            Socket.IO 기반 실시간 동시 편집 기능을 도입해, 수강생과 멘토 간 코드
            공유 및 피드백 지연 문제를 해결했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          <Chip>TypeScript</Chip>
          <Chip>Next.js</Chip>
          <Chip>React Context</Chip>
          <Chip>Tanstack ReactQuery</Chip>
          <Chip>Styled-Component</Chip>
          <Chip>Framer-Motion</Chip>
          <Chip>RestAPI</Chip>
          <Chip>Axios</Chip>
          <Chip>AWS EC2</Chip>
        </ChipsWrapper>
      </ResumeDescriptionItem>
    </ResumeDescriptionContainer>
  );
}

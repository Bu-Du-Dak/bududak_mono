"use client";
import StickyBox from "@repo/ui/layout/StickyBox";
import styled from "styled-components";
import ResumeInfo from "./ResumeInfo";
import { media } from "../../../../packages/ui/src/styles/breakPoints";
import { List, ListItem } from "@repo/ui/components/List";

export default function ResumeCodeCamp() {
  return (
    <Wrapper>
      <ResumeInfo
        title="코드캠프"
        subTitle="프론트엔드"
        duration="2021.10 ~ 2022"
        description="aaa"
      />
      <List>
        <ListItem>xzczxzcxzcxzxc</ListItem>
        <ListItem>xzczxzcxzcxzxc2</ListItem>
        <ListItem>xzczxzcxzcxzxc3</ListItem>
      </List>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  ${media.lt("tablet")} {
    flex-direction: column;
  }
`;

"use client";
import styled from "styled-components";
import ResumeInfo from "./ResumeInfo";
import { media } from "../../../../packages/ui/src/styles/breakPoints";
import { List, ListItem } from "@repo/ui/components/List";
import { ReactNode } from "react";
import Heading from "@repo/ui/typography/Heading";
type ResumeContentsProps = {
  title: string;
  subTitle?: string;
  duration?: string;
  description?: string;
  listComponent?: ReactNode;
};
export default function ResumeContents({
  title,
  subTitle,
  duration,
  description,
  listComponent,
}: ResumeContentsProps) {
  return (
    <Wrapper>
      <ResumeInfo
        title={title}
        subTitle={subTitle}
        duration={duration}
        description={description}
      />
      <ListWrapper>{listComponent}</ListWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  gap: 8rem;
  ${media.lt("tablet")} {
    flex-direction: column;
    gap: 2rem;
  }
`;
const ListWrapper = styled.div`
  ${media.lt("tablet")} {
    padding: 0 0 0 2rem;
    border-left: ${({ theme }) => `0.3rem solid ${theme.colors.secondary}`};
  }
`;

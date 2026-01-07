"use client";
import styled from "styled-components";
import ResumeInfo from "./ResumeInfo";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";
import { ReactNode } from "react";
type ResumeContentsProps = {
  title: string;
  subTitle?: string;
  duration?: string;
  description?: string;
  listComponent?: ReactNode;
};
export default function StickyContents({
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
      <ResumeDescription>{listComponent}</ResumeDescription>
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
const ResumeDescription = styled.div`
  ${media.lt("tablet")} {
    padding: 0 0 0 2rem;
    border-left: ${({ theme }) => `0.3rem solid ${theme.colors.secondary}`};
  }
`;

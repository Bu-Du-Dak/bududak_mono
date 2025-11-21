"use client";
import StickyBox from "@repo/ui/layout/StickyBox";
import styled from "styled-components";
import ResumeInfo from "./ResumeInfo";
import { media } from "../../../../packages/ui/src/breakPoints";

export default function ResumeCodeCamp() {
  return (
    <Wrapper>
      <ResumeInfo
        title="코드캠프"
        subTitle="프론트엔드"
        duration="2021.10 ~ 2022"
        description="aaa"
      />
      <div style={{ height: "1500px" }}>a</div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  ${media.lt("tablet")} {
    flex-direction: column;
  }
`;

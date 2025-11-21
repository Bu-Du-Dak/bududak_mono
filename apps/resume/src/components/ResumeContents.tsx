"use client";

import StickyBox from "@repo/ui/layout/StickyBox";
import Anchor from "@repo/ui/typography/Anchor";
import styled from "styled-components";

export default function ResumeContents() {
  return (
    <Wrapper>
      <StickyBox>
        <div style={{ width: "200px", height: "50px" }}>aaa</div>
        <div style={{ height: "50px" }}>aaa2</div>
        <div style={{ height: "50px" }}>aaa3</div>
        <Anchor href="#">test link</Anchor>
      </StickyBox>
      <div style={{ height: "1500px" }}>a</div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
`;

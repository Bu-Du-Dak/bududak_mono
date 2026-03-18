"use client";
import styled from "styled-components";
import ThemeToggle from "@repo/ui/themes/themeToggle";
import Heading from "@repo/ui/typography/Heading";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";

export default function ResumeHeader() {
  return (
    <Wrapper>
      <Row>
        <Heading level={1}>더 나은 경험을 만드는 개발자, 홍재훈</Heading>
        <ThemeToggle />
      </Row>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 0 2rem 0;
  ${media.lt("tablet")} {
    padding: 4rem 0 0 0;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  ${media.lt("tablet")} {
    align-items: start;
  }
`;

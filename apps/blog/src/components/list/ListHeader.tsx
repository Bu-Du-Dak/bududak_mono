"use client";

import ThemeToggle from "@repo/ui/themes/themeToggle";
import Heading from "@repo/ui/typography/Heading";
import styled, { useTheme } from "styled-components";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";
import Paragraph from "@repo/ui/typography/Paragraph";

export default function ListHeader() {
  const theme = useTheme();
  return (
    <Wrapper>
      <Row>
        <Heading level={1}>Dev Notes</Heading>
        <ThemeToggle />
      </Row>
      <Paragraph color={theme.colors.border}>
        Simple Notes for Complex Ideas
      </Paragraph>
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
`;

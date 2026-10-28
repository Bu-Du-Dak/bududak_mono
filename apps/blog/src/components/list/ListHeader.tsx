"use client";

import ThemeToggle from "@repo/ui/themes/themeToggle";
import Heading from "@repo/ui/typography/Heading";
import styled, { useTheme } from "styled-components";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";
import Paragraph from "@repo/ui/typography/Paragraph";
import Link from "next/link";

export default function ListHeader() {
  const theme = useTheme();
  return (
    <Wrapper>
      <Row>
        <Heading level={1}>Dev Notes</Heading>
        <ThemeToggle />
      </Row>
      <Description>
        <Paragraph color={theme.colors.textSecondary}>
          Simple Notes for Complex Ideas by
        </Paragraph>
        <Auth level={2}>
          <Link href={"https://bududak.com"} target="_blank">
            BuDuDak
          </Link>
        </Auth>
      </Description>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
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
const Description = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const Auth = styled(Heading)`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};
`;

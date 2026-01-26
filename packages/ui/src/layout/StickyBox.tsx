"use client";
import { ReactNode } from "react";
import styled from "styled-components";

export default function StickyBox({
  sticky,
  children,
}: {
  sticky: boolean;
  children: ReactNode;
}) {
  return (
    <Container>
      <BoxWrapper $sticky={sticky}>{children}</BoxWrapper>
    </Container>
  );
}
const Container = styled.div`
  height: auto;
`;
const BoxWrapper = styled.div<{ $sticky: boolean }>`
  position: ${({ $sticky }) => ($sticky ? "sticky" : "")};
  top: 2rem;
`;

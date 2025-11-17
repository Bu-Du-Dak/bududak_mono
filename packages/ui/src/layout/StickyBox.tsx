"use client";
import { ReactNode } from "react";
import styled from "styled-components";

export default function StickyBox({ children }: { children: ReactNode }) {
  return (
    <Container>
      <BoxWrapper>{children}</BoxWrapper>
    </Container>
  );
}
const Container = styled.div`
  height: auto;
`;
const BoxWrapper = styled.div`
  position: sticky;
  top: 2rem;
`;

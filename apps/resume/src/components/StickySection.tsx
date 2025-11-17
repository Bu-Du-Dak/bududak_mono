"use client";
import { ReactNode } from "react";
import styled from "styled-components";

export default function StickySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
}
const Wrapper = styled.section``;
const Title = styled.h2``;

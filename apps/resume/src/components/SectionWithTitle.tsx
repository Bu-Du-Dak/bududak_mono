"use client";
import Heading from "@repo/ui/typography/Heading";
import { ReactNode } from "react";
import styled from "styled-components";

export default function SectionWithTitle({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Wrapper>
      <Heading level={2}>{title}</Heading>
      {children}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

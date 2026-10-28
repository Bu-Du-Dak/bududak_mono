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
      <Heading level={2}>
        {title}
        <span className="dot">.</span>
      </Heading>
      {children}
      <Hr />
    </Wrapper>
  );
}
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  .dot {
    display: inline-block;
    padding-left: 0.2rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.border};
  opacity: 0.1;
`;

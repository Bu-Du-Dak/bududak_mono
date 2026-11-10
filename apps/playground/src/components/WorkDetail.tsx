"use client";
import styled from "styled-components";
import Link from "next/link";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";

type Props = { title: string; description: string; children: React.ReactNode };

export default function WorkDetail({ title, description, children }: Props) {
  return (
    <Container>
      <Back href="/">← 목록으로</Back>
      <Heading level={2}>{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <Stage>{children}</Stage>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 4rem 0;
`;
const Back = styled(Link)`
  width: fit-content;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const Stage = styled.section`
  margin-top: 2.4rem;
`;

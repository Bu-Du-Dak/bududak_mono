"use client";
import styled from "styled-components";
import Link from "next/link";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import { Chip } from "@repo/ui/components/Chip";
import type { Work } from "../../constants/works";

export default function Card({ work }: { work: Omit<Work, "Component"> }) {
  return (
    <li>
      <StyledLink href={`/${work.id}`}>
        <Thumb aria-hidden>{work.emoji}</Thumb>
        <Heading level={3}>{work.title}</Heading>
        <Paragraph>{work.description}</Paragraph>
        <Tags>
          {work.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </Tags>
      </StyledLink>
    </li>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: 100%;
  padding: 2.4rem 2rem;
  border: ${({ theme }) => `0.1rem solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radius};
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-0.4rem);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.18);
  }
`;

const Thumb = styled.div`
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  font-size: 6rem;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.border}40;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: auto;
`;

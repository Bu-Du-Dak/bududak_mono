"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import Button from "@repo/ui/components/Button";
import { Chip } from "@repo/ui/components/Chip";
import { List, ListItem } from "@repo/ui/components/List";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import type { Project } from "../../constants/projects";
import Image from "next/image";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";
import { useAnimatedSrc } from "../../lib/useAnimatedSrc";
export default function ProjectDetail({ project }: { project: Project }) {
  const router = useRouter();
  const image = useAnimatedSrc(project.imgUrl, project.posterUrl);
  return (
    <Container>
      <div>
        <Button onClick={() => router.push("/")}>프로젝트 목록으로</Button>
      </div>
      <Content>
        <Section>
          <ImageWrapper>
            <StyledImage
              ref={image.ref}
              src={image.src}
              unoptimized={image.unoptimized}
              alt={project.title}
              width={800}
              height={400}
              priority
              sizes="(max-width: 767px) 100vw, 800px"
            />
          </ImageWrapper>
          <Heading level={2}>{project.title}</Heading>
          <Paragraph>{project.company}</Paragraph>
          <Paragraph>{project.description}</Paragraph>
          <Paragraph>담당: {project.role}</Paragraph>
        </Section>
        <Section>
          <Heading level={3}>기술 스택</Heading>
          <ChipsWrapper>
            {project.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </ChipsWrapper>
        </Section>
        {project.sections.map((section) => (
          <Section key={section.title}>
            <Heading level={3}>{section.title}</Heading>
            <List>
              {section.paragraphs.map((paragraph) => (
                <ListItem key={paragraph}>{paragraph}</ListItem>
              ))}
            </List>
            {section.code && (
              <Figure>
                <CodeBlock>
                  <code>{section.code.content}</code>
                </CodeBlock>
                <Caption>{section.code.caption}</Caption>
              </Figure>
            )}
            {section.note && <Note>{section.note}</Note>}
          </Section>
        ))}
      </Content>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding: 4rem 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const ChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;

  ${media.lt("tablet")} {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 0;
`;
const CodeBlock = styled.pre`
  margin: 0;
  padding: 1.6rem;
  overflow-x: auto;
  border: ${({ theme }) => `0.1rem solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.monoFamily};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.6;
  white-space: pre;
  ${media.lt("tablet")} {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }
`;
const Caption = styled.figcaption`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.tertiary};
`;
const Note = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

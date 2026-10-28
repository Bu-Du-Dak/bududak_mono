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
export default function ProjectDetail({ project }: { project: Project }) {
  const router = useRouter();
  return (
    <Container>
      <div>
        <Button onClick={() => router.push("/")}>프로젝트 목록으로</Button>
      </div>
      <Content>
        <Section>
          <ImageWrapper>
            <StyledImage
              src={project.imgUrl}
              alt={project.title}
              width={800}
              height={400}
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

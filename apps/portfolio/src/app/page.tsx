"use client";
import styled from "styled-components";
import ListSection from "../components/list/ListSection";
import { PROJECTS } from "../constants/projects";

export default function Home() {
  return (
    <Container>
      {PROJECTS.map((project) => (
        <ListSection
          key={project.title}
          title={project.title}
          description={project.description}
          items={project.items}
        />
      ))}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding: 4rem 0;
`;

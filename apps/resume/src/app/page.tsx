"use client";
import styled from "styled-components";
import ProfileContents from "../components/ProfileContents";
import WorkExperienceContents from "../components/WorkExperienceSection/WorkExperienceContents";
import EducationAchievementContents from "../components/EducationAchievementSection/EducationAchievementContents";
import ContactContents from "../components/ContactSection/ContactContents";
import SkillContents from "../components/SkillSection/SkillContents";

export default function Home() {
  return (
    <Container>
      <ProfileContents />
      <WorkExperienceContents />
      <SkillContents />
      <EducationAchievementContents />
      <ContactContents />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding: 4rem 0;
`;

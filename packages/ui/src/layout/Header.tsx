"use client";
import styled from "styled-components";
import ThemeToggle from "../themes/themeToggle";
import { media } from "../breakPoints";

export default function Header() {
  return (
    <HeaderContainer>
      <ThemeToggle />
    </HeaderContainer>
  );
}
const HeaderContainer = styled.header`
  width: 100%;
  max-width: 120rem;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 2rem;
  margin: 0 auto;

  /* tablet: 768–1023px */
  ${media.between("tablet", "web")} {
    max-width: 96rem;
  }

  /* mobile: <768px */
  ${media.lt("tablet")} {
    max-width: 100%;
  }
`;

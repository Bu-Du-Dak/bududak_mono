"use client";
import styled from "styled-components";
import { media } from "../breakPoints";

export default function Footer() {
  return (
    <FooterContainer>
      Copyright © {new Date().getFullYear()}
      <Anchor
        href="https://github.com/Bu-Du-Dak"
        target="_blank"
        rel="noreferrer"
      >
        Bu-Du-Dak
      </Anchor>
      All rights reserved.
    </FooterContainer>
  );
}
const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding-block: 5rem;
  padding-inline: 2rem;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  ${media.between("tablet", "web")} {
    max-width: 96rem;
  }
  ${media.lt("tablet")} {
    max-width: 100%;
  }
`;
const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

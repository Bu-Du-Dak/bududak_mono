"use client";
import { ReactNode } from "react";
import styled from "styled-components";
import { media } from "../../styles/breakPoints";

export default function BlogContents({ children }: { children: ReactNode }) {
  return <ContentsContainer>{children}</ContentsContainer>;
}
const ContentsContainer = styled.main`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* 기본: web (≥1024px) */
  margin: 0 auto;
  width: 100%;
  max-width: 70rem;
  padding-inline: 2rem;

  /* tablet: 768–1023px */
  ${media.between("tablet", "web")} {
    /* max-width: 60rem; */
  }

  /* mobile: <768px */
  ${media.lt("tablet")} {
    /* max-width: 100%; */
  }
`;

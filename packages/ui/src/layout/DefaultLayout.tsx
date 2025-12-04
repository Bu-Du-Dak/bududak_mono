"use client";
import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { media } from "../styles/breakPoints";
import { UIThemeProvider } from "../themes/themeProvider";

type MaxWidth = {
  web?: number | string;
  tablet?: number | string;
  mobile?: number | string;
};

type DefaultLayoutProps = {
  initialMode: "light" | "dark";
  headerContent?: ReactNode;
  children: ReactNode;
  maxWidth?: MaxWidth;
};

function sizeFormatter(size: number | string) {
  return typeof size === "number" ? `${size}rem` : size;
}

export default function DefaultLayout({
  initialMode,
  headerContent,
  children,
  maxWidth,
}: DefaultLayoutProps) {
  return (
    <UIThemeProvider initialMode={initialMode}>
      <Wrapper $maxWidth={maxWidth}>
        <HeaderContainer>{headerContent}</HeaderContainer>
        <MainContainer>{children}</MainContainer>
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
      </Wrapper>
    </UIThemeProvider>
  );
}

const responsiveMaxWidth = css<{ $maxWidth?: MaxWidth }>`
  max-width: ${({ $maxWidth }) =>
    $maxWidth?.web ? sizeFormatter($maxWidth.web) : "120rem"};

  ${media.between("tablet", "web")} {
    max-width: ${({ $maxWidth }) =>
      $maxWidth?.tablet ? sizeFormatter($maxWidth.tablet) : "96rem"};
  }

  ${media.lt("tablet")} {
    max-width: ${({ $maxWidth }) =>
      $maxWidth?.mobile ? sizeFormatter($maxWidth.mobile) : "100%"};
  }
`;

const Wrapper = styled.div<{ $maxWidth?: MaxWidth }>`
  width: 100%;
  margin: 0 auto;
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;
  ${responsiveMaxWidth}
`;

const HeaderContainer = styled.header`
  margin: 0 auto;
  width: 100%;
`;

const MainContainer = styled.main`
  width: 100%;
`;

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  width: 100%;
  margin: 0 auto;
  padding-block: 5rem;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;
const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

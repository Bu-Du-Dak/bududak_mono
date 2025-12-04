"use client";
import styled from "styled-components";
import { useTheme } from "./themeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { mode, toggle } = useTheme();
  const isDark = mode === "dark";

  return (
    <Btn
      onClick={toggle}
      type="button"
      aria-label={isDark ? "라이트 모드" : "다크 모드"}
      aria-pressed={isDark}
    >
      <Switch $isDark={isDark}>
        <Knob $isDark={isDark}>
          {isDark ? <Moon size={13} /> : <Sun size={13} />}
        </Knob>
      </Switch>
    </Btn>
  );
}

const Btn = styled.button`
  border: 0;
  padding: 0;
  background: none;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const Switch = styled.div<{ $isDark: boolean }>`
  width: 4.8rem;
  height: 2.6rem;
  padding: 0.3rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  position: relative;
  background: ${({ theme, $isDark }) =>
    $isDark
      ? `linear-gradient(135deg, ${theme.colors.bg} 0%, ${theme.colors.primary} 80%)`
      : `linear-gradient(135deg, #ffd27f 0%, ${theme.colors.primary} 80%)`};

  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.35);
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.12s ease-out;

  ${Btn}:active & {
    transform: scale(0.97);
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.4);
  }
`;

const Knob = styled.div<{ $isDark: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};

  transform: translateX(${({ $isDark }) => ($isDark ? "2rem" : "0")});
  transition: transform 0.32s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  svg {
    position: relative;
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    z-index: 1;

    background: ${({ $isDark }) =>
      $isDark ? "rgba(0, 0, 0, 0.35)" : "rgba(255, 255, 255, 0.75)"};
    backdrop-filter: blur(0.4rem);
    box-shadow: 0 0.15rem 0.35rem rgba(0, 0, 0, 0.35);

    transform-origin: ${({ $isDark }) =>
      $isDark ? "right center" : "left center"};
    transform: scaleX(1) scaleY(1);
    transition:
      transform 0.22s ease-out,
      background 0.25s ease,
      box-shadow 0.25s ease;
  }

  ${Btn}:active &::before {
    transform: scaleX(1.25) scaleY(0.9);
  }
`;

"use client";
import styled from "styled-components";
import { useTheme } from "./themeProvider";

export default function ThemeToggle() {
  const { mode, toggle } = useTheme();
  return (
    <Btn onClick={toggle}>{mode === "dark" ? "Light Mode" : "Dark Mode"}</Btn>
  );
}

const Btn = styled.button`
  border: 0;
  border-radius: ${({ theme }) => theme.radius};
  padding: 0.8rem 1.2rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  cursor: pointer;
`;

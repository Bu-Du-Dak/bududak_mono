"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { GlobalStyle } from "../styles/global-styles";
import { AppTheme, darkTheme, lightTheme } from "./themes";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  toggle: () => void;
  setMode: (m: ThemeMode) => void;
};

const ThemeCtx = createContext<ThemeContextValue | null>(null);
const COOKIE_NAME = "theme";

type ColorKey = keyof AppTheme["colors"];
const colorKeys = Object.keys(darkTheme.colors) as ColorKey[];
const cssVar = (key: ColorKey) => `--color-${key}`;
const toVars = (colors: AppTheme["colors"]) =>
  colorKeys.map((key) => `${cssVar(key)}: ${colors[key]};`).join("");

// 색상은 CSS 변수로 참조해 정적 HTML에서도 data-theme만으로 테마가 바뀌도록 한다.
const varColors = Object.fromEntries(
  colorKeys.map((key) => [key, `var(${cssVar(key)})`]),
) as AppTheme["colors"];

const ThemeVariables = createGlobalStyle`
  :root, :root[data-theme="dark"] { ${toVars(darkTheme.colors)} }
  :root[data-theme="light"] { ${toVars(lightTheme.colors)} }
`;

function writeCookie(mode: ThemeMode) {
  document.cookie = `${COOKIE_NAME}=${mode}; Max-Age=${60 * 60 * 24 * 400}; Path=/; SameSite=Lax`;
}

export function UIThemeProvider({
  initialMode = "dark",
  children,
}: {
  initialMode?: ThemeMode;
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [synced, setSynced] = useState(false);

  // 인라인 스크립트가 정한 테마를 하이드레이션 이후 상태로 가져온다.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setMode(current);
    setSynced(true);
  }, []);

  useEffect(() => {
    if (!synced) return;
    writeCookie(mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode, synced]);

  const theme: AppTheme = {
    ...(mode === "dark" ? darkTheme : lightTheme),
    colors: varColors,
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
      setMode,
    }),
    [mode]
  );

  return (
    <ThemeCtx.Provider value={value}>
      <ThemeProvider theme={theme}>
        <ThemeVariables />
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeCtx.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within <UIThemeProvider>");
  return ctx;
}

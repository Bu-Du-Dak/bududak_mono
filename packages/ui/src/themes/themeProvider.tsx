"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

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

  useEffect(() => {
    writeCookie(mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const theme: AppTheme = mode === "dark" ? darkTheme : lightTheme;

  const value = useMemo<ThemeContextValue>(
    () => ({
      // theme,
      mode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
      setMode,
    }),
    [mode]
  );

  return (
    <ThemeCtx.Provider value={value}>
      <ThemeProvider theme={theme}>
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

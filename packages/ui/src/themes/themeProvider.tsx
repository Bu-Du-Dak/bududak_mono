"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../global-styles";
import { AppTheme, darkTheme, lightTheme } from "./themes";

type ThemeContextValue = {
  theme: AppTheme;
  mode: "light" | "dark";
  toggle: () => void;
  setMode: (m: "light" | "dark") => void;
};

const ThemeCtx = createContext<ThemeContextValue | null>(null);
const COOKIE_NAME = "theme";

function readCookie(): "light" | "dark" | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)theme=(light|dark)/);
  return m ? (m[1] as "light" | "dark") : null;
}

function writeCookie(mode: "light" | "dark") {
  document.cookie = `${COOKIE_NAME}=${mode}; Max-Age=${60 * 60 * 24 * 400}; Path=/; SameSite=Lax`;
}

export function UIThemeProvider({
  initialMode,
  children,
}: {
  initialMode?: "light" | "dark";
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">(initialMode ?? "light");

  useEffect(() => {
    const saved = readCookie();
    if (saved && saved !== mode) setMode(saved);
  }, []);

  useEffect(() => {
    writeCookie(mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const theme = mode === "dark" ? darkTheme : lightTheme;

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      mode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
      setMode,
    }),
    [theme, mode]
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

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within <UIThemeProvider>");
  return ctx;
}

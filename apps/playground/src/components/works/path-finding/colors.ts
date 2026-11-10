import type { DefaultTheme } from "styled-components";

export const paletteOf = (theme: DefaultTheme) => ({
  empty: theme.colors.bg,
  line: theme.colors.border,
  wall: theme.mode === "dark" ? "#71717A" : "#3F3F46",
  weight: "#B45309",
  open: "#34D399",
  current: "#F43F5E",
  path: "#FACC15",
  start: "#10B981",
  end: "#EF4444",

  visited: (t: number) =>
    `hsl(${195 + t * 75} 75% ${theme.mode === "dark" ? 45 : 65}%)`,

  visitedEnd: (t: number) =>
    `hsl(${345 - t * 45} 70% ${theme.mode === "dark" ? 50 : 70}%)`,
});

const resolve = (color: string) => {
  const m = color.match(/^var\((--[^)]+)\)$/);
  return m
    ? getComputedStyle(document.documentElement).getPropertyValue(m[1]!).trim()
    : color;
};

export const canvasPaletteOf = (theme: DefaultTheme) => {
  const p = paletteOf(theme);
  return { ...p, empty: resolve(p.empty), line: resolve(p.line) };
};

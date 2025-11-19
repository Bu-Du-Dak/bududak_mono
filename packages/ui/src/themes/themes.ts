import { breakpoints } from "../breakPoints";
const typography = {
  fontFamily: `var(--font-geist-sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif)`,
  monoFamily: `var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace)`,
  sizes: {
    xs: "1.2rem",
    sm: "1.4rem",
    md: "1.6rem",
    lg: "1.8rem",
    xl: "2rem",
    "2xl": "2.4rem",
    "3xl": "3.4rem",
    "4xl": "4rem",
    "5xl": "4.6rem",
  },
  weights: {
    regular: 400,
    medium: 600,
    bold: 700,
  },
} as const;
export type AppTheme = {
  mode: "light" | "dark";
  colors: { bg: string; text: string; primary: string };
  radius: string;
  breakpoints: typeof breakpoints;
  typography: typeof typography;
};

export const lightTheme: AppTheme = {
  mode: "light",
  colors: { bg: "#ffffff", text: "#111111", primary: "#2F80ED" },
  radius: "1.2rem",
  breakpoints,
  typography,
};

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: { bg: "#202021", text: "#EDEDED", primary: "#2F80ED" },
  radius: "1.2rem",
  breakpoints,
  typography,
};

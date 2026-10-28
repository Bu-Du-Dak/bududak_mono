import { breakpoints } from "../styles/breakPoints";
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
  colors: {
    bg: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    secondary: string;
    tertiary: string;
  };
  radius: string;
  breakpoints: typeof breakpoints;
  typography: typeof typography;
};

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    bg: "#F7F7F8",
    text: "#1C1C1C",
    textSecondary: "#52525B",
    border: "#C9CBD3",
    primary: "#2563EB",
    secondary: "#1E40AF",
    tertiary: "#6B7280",
  },
  radius: "1.2rem",
  breakpoints,
  typography,
};

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    bg: "#232327",
    text: "#E6E6E6",
    textSecondary: "#A1A1AA",
    border: "#3A3A42",
    primary: "#6EC6FF",
    secondary: "#4C9BFF",
    tertiary: "#BEBEBE",
  },
  radius: "1.2rem",
  breakpoints,
  typography,
};

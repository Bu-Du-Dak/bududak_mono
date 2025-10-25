import { breakpoints } from "../breakPoints";
const typography = {
  fontFamily: `var(--font-geist-sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif)`,
  monoFamily: `var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace)`,
  sizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
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
  typography: {
    fontFamily: string;
    monoFamily: string;
    sizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
    };
    weights: {
      regular: number;
      medium: number;
      bold: number;
    };
  };
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

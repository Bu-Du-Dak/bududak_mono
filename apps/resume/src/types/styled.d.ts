// apps/resume/src/types/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: "light" | "dark";
    colors: {
      bg: string;
      text: string;
      primary: string;
    };
    radius: string;
    breakpoints: { mobile: number; tablet: number; web: number };
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
      weights: { regular: number; medium: number; bold: number };
    };
  }
}

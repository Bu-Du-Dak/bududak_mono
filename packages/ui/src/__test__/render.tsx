import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../themes/themes";
import { ReactElement } from "react";

export const testTheme = {
  colors: lightTheme.colors,
  mode: lightTheme.mode,
  radius: lightTheme.radius,
  breakpoints: lightTheme.breakpoints,
  typography: lightTheme.typography,
};
export const renderWithTheme = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={testTheme}>{ui}</ThemeProvider>, options);
};

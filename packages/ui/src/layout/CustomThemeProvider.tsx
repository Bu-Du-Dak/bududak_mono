import { ReactNode } from "react";
import { UIThemeProvider } from "../themes/themeProvider";

export default function CustomThemeProvider({
  children,
  initialMode,
}: {
  children: ReactNode;
  initialMode: "light" | "dark";
}) {
  return (
    <UIThemeProvider initialMode={initialMode}>{children}</UIThemeProvider>
  );
}

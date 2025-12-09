import type { Metadata } from "next";

import { cookies } from "next/headers";

import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import CustomThemeProvider from "@repo/ui/layout/CustomThemeProvider";

export const metadata: Metadata = {
  title: "BuDuDak's Dev Notes",
  description: "Simple Notes for Complex Ideas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const mode = (cookie.get("theme")?.value as "light" | "dark") ?? "dark";
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <CustomThemeProvider initialMode={mode}>
            {children}
          </CustomThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import { cookies } from "next/headers";
import DefaultLayout from "@repo/ui/layout/DefaultLayout";
import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import HeaderContents from "../components/HeaderContents";

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
          <DefaultLayout
            initialMode={mode}
            headerContent={<HeaderContents />}
            maxWidth={{
              web: 90,
              tablet: 90,
              mobile: "100%",
            }}
          >
            {children}
          </DefaultLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

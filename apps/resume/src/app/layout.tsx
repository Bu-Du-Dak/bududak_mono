import type { Metadata } from "next";

import { cookies } from "next/headers";
import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import DefaultLayout from "@repo/ui/layout/DefaultLayout";
import CustomThemeProvider from "@repo/ui/layout/CustomThemeProvider";
import ScrollProgressBar from "@repo/ui/layout/ScrollProgressBar";
import ResumeHeader from "../components/ResumeHeader";

export const metadata: Metadata = {
  // title: "홍재훈 | 프론트엔드 개발자",
  title: "ㅁㅁㅁ",
  description: "프론트엔드 개발자 홍재훈입니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const mode = (cookie.get("theme")?.value as "light" | "dark") ?? "dark";
  return (
    <html lang="ko" data-theme={mode}>
      <body>
        <StyledComponentsRegistry>
          <CustomThemeProvider initialMode={mode}>
            <ScrollProgressBar />
            <DefaultLayout
              headerContent={<ResumeHeader />}
              maxWidth={{
                web: 75,
                tablet: 75,
                mobile: "100%",
              }}
            >
              {children}
            </DefaultLayout>
          </CustomThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

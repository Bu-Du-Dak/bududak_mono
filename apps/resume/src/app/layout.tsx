import type { Metadata } from "next";

import { cookies } from "next/headers";
import ResumeLayout from "@repo/ui/layout/resume/ResumeLayout";
import StyledComponentsRegistry from "../components/StyledComponentsRegistry";

export const metadata: Metadata = {
  title: "홍재훈 | 프론트엔드 개발자",
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
          <ResumeLayout initialMode={mode}>{children}</ResumeLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

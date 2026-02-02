import type { Metadata } from "next";

import { cookies } from "next/headers";
import StyledComponentsRegistry from "../components/layout/StyledComponentsRegistry";
import DefaultLayout from "@repo/ui/layout/DefaultLayout";
import CustomThemeProvider from "@repo/ui/layout/CustomThemeProvider";
import ScrollProgressBar from "@repo/ui/layout/ScrollProgressBar";
import ResumeHeader from "../components/layout/ResumeHeader";

export const metadata: Metadata = {
  title: "홍재훈 | Frontend Engineer",
  description:
    "사용자 경험을 중심으로 구조적인 문제 해결을 지향하는 프론트엔드 엔지니어 홍재훈입니다.",
  metadataBase: new URL("https://bududak.com"),
  applicationName: "홍재훈 | Frontend Engineer",
  generator: "Next.js",
  authors: [{ name: "BuDuDak" }],
  creator: "BuDuDak",
  publisher: "BuDuDak",
  referrer: "origin-when-cross-origin",
  keywords: ["BuDuDak", "js", "ts", "frontend", "Next"],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "홍재훈 | Frontend Engineer",
    locale: "ko_KR",
    url: "https://bududak.com",
    images: [
      //! 이미지 뭐넣지
      { url: "", width: 1200, height: 630, alt: "홍재훈 | Frontend Engineer" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@BuDuDak",
    images: [""],
  },
  alternates: {
    languages: {
      "ko-KR": "/ko",
    },
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      {
        url: "/favicons/favicon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicons/favicon.ico",
        sizes: "16x16 32x32 48x48 64x64 128x128 256x256 512x512",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
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

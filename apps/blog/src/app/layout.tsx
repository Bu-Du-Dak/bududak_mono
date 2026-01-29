import type { Metadata } from "next";

import { cookies } from "next/headers";

import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import CustomThemeProvider from "@repo/ui/layout/CustomThemeProvider";

export const metadata: Metadata = {
  title: "BuDuDak's Dev Notes",
  description: "Simple Notes for Complex Ideas",
  metadataBase: new URL("https://blog.bududak.com"),
  applicationName: "BuDuDak's Dev Notes",
  generator: "Next.js",
  authors: [{ name: "BuDuDak" }],
  creator: "BuDuDak",
  publisher: "BuDuDak",
  referrer: "origin-when-cross-origin",
  keywords: ["BuDuDak", "Blog", "js", "ts", "frontend", "Next"],
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
    siteName: "BuDuDak's Dev Notes",
    locale: "ko_KR",
    url: "https://blog.bududak.com",
    images: [
      //! 이미지 뭐넣지
      { url: "", width: 1200, height: 630, alt: "BuDuDak's Dev Notes" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@BuDuDak",
    //! 이미지 뭐넣지
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

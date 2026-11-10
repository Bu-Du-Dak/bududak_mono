import type { Metadata } from "next";

import StyledComponentsRegistry from "../components/layout/StyledComponentsRegistry";
import DefaultLayout from "@repo/ui/layout/DefaultLayout";
import CustomThemeProvider from "@repo/ui/layout/CustomThemeProvider";
import ThemeInitScript from "@repo/ui/themes/themeInitScript";
import PlaygroundHeader from "../components/layout/PlaygroundHeader";

export const metadata: Metadata = {
  title: "홍재훈 | Playground",
  description:
    "재미로 만든 작은 웹 장난감과 실험들을 모아둔 공간입니다.",
  metadataBase: new URL("https://playground.bududak.com"),
  applicationName: "홍재훈 | Playground",
  generator: "Next.js",
  authors: [{ name: "BuDuDak" }],
  creator: "BuDuDak",
  publisher: "BuDuDak",
  referrer: "origin-when-cross-origin",
  keywords: ["BuDuDak", "js", "ts", "frontend", "Next"],
  robots: {
    index: true,
    follow: true,
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
    siteName: "홍재훈 | Playground",
    locale: "ko_KR",
    url: "https://playground.bududak.com",
  },
  alternates: {
    canonical: "/",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeInitScript />
      </head>
      <body>
        <StyledComponentsRegistry>
          <CustomThemeProvider>
            <DefaultLayout
              headerContent={<PlaygroundHeader />}
              maxWidth={{
                web: 90,
                tablet: 90,
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

import type { Metadata } from "next";

import { cookies } from "next/headers";

import StyledComponentsRegistry from "../components/StyledComponentsRegistry";
import CustomThemeProvider from "@repo/ui/layout/CustomThemeProvider";

export const metadata: Metadata = {
  title: "BuDuDak's Dev Notes",
  description: "Simple Notes for Complex Ideas",
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

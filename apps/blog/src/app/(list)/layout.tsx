import type { Metadata } from "next";

import DefaultLayout from "@repo/ui/layout/DefaultLayout";
import HeaderContents from "../../components/list/ListHeader";

export const metadata: Metadata = {
  title: "BuDuDak's Dev Notes",
  description: "Simple Notes for Complex Ideas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DefaultLayout
      headerContent={<HeaderContents />}
      maxWidth={{
        web: 90,
        tablet: 90,
        mobile: "100%",
      }}
    >
      {children}
    </DefaultLayout>
  );
}

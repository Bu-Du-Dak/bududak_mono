"use client";
import { ReactNode } from "react";
import { UIThemeProvider } from "../../themes/themeProvider";

import Footer from "../Footer";
import BlogContents from "./BlogContents";

export default function BlogLayout({
  initialMode,
  children,
}: {
  initialMode: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <div>
      <UIThemeProvider initialMode={initialMode}>
        {/* <Header /> */}
        <BlogContents>{children}</BlogContents>
        <Footer />
      </UIThemeProvider>
    </div>
  );
}

"use client";
import { ReactNode } from "react";
import { UIThemeProvider } from "../../themes/themeProvider";

import Footer from "../Footer";
import ResumeHeader from "./ResumeHeader";
import ResumeContents from "./ResumeContents";

export default function DefaultLayout({
  initialMode,
  children,
}: {
  initialMode: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <div>
      <UIThemeProvider initialMode={initialMode}>
        <ResumeHeader />
        <ResumeContents>{children}</ResumeContents>
        <Footer />
      </UIThemeProvider>
    </div>
  );
}

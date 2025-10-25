import { ReactNode } from "react";
import { UIThemeProvider } from "../themes/themeProvider";
import Header from "./Header";
import Contents from "./Contents";
import Footer from "./Footer";

export default function DefaultLayout({
  initialMode,
  children,
}: {
  initialMode: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <div
    //   style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    //   style={{ margin: "0 auto" }}
    >
      <UIThemeProvider initialMode={initialMode}>
        <Header />
        <Contents>{children}</Contents>
        <Footer />
      </UIThemeProvider>
    </div>
  );
}

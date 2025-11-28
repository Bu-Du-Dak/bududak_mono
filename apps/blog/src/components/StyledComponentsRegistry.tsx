// app/lib/StyledComponentsRegistry.tsx
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버 렌더링 시 한 번만 스타일시트 생성
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // 같은 스타일이 중복으로 들어가지 않도록 비워주기
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // 클라이언트에서는 그냥 children만 렌더
  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  // 서버에서는 StyleSheetManager로 감싸서 스타일 수집
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}

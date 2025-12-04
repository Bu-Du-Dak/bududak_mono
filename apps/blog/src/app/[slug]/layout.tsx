"use client";
import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";

export default function DetailLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <BackBtn>
        <Link href="/">← 리스트로 돌아가기</Link>
      </BackBtn>
      {children}
    </div>
  );
}
const BackBtn = styled.div`
  margin: 2rem 0;
`;

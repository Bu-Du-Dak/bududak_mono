"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={className}
      style={{
        width: "200px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => alert(`Hello from your  app!`)}
    >
      {children}
    </button>
  );
};

"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const root = document.documentElement;
      const scrollTop = root.scrollTop;
      const scrollHeight = root.scrollHeight - root.clientHeight;

      const percent =
        scrollHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
          : 0;

      setProgress(percent);
    };

    calculate();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        calculate();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calculate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calculate);
    };
  }, []);

  return (
    <Bar aria-hidden="true">
      <Percent $progress={progress} />
    </Bar>
  );
}

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 0.4rem;
  width: 100%;
  z-index: 4;
`;

const Percent = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.primary} 60%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  transform-origin: left center;
  transform: ${({ $progress }) => `scaleX(${$progress / 100})`};
  transition: transform 140ms ease-out;
`;

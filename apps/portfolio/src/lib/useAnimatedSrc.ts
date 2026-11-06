"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 정지 첫 프레임(poster)을 먼저 보여 주고, 이미지가 화면에 들어오고
 * 페이지 로드가 끝난 뒤 애니메이션 원본을 받아 교체한다.
 * 큰 애니메이션 파일이 LCP를 늦추지 않게 하기 위함.
 */
export function useAnimatedSrc(animatedSrc: string, posterSrc?: string) {
  const ref = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState(posterSrc ?? animatedSrc);

  useEffect(() => {
    setSrc(posterSrc ?? animatedSrc);
    if (!posterSrc || !ref.current) return;

    let cancelled = false;
    const preload = () => {
      const img = new window.Image();
      img.onload = () => {
        if (!cancelled) setSrc(animatedSrc);
      };
      img.src = animatedSrc;
    };
    const startAfterLoad = () => {
      if (document.readyState === "complete") preload();
      else window.addEventListener("load", preload, { once: true });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          startAfterLoad();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(ref.current);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("load", preload);
    };
  }, [animatedSrc, posterSrc]);

  // 애니메이션 원본은 최적화 경로를 거치지 않게 해 미리 받은 파일을 그대로 쓴다.
  return { ref, src, unoptimized: src === animatedSrc && !!posterSrc };
}

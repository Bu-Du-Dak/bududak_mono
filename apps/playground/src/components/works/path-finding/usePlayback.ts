import { useCallback, useEffect, useRef, useState } from "react";
import type { SearchResult } from "./lib/search";
import {
  applyStep,
  createVisual,
  totalSteps,
  type Visual,
} from "./lib/playback";

export type Status = "idle" | "running" | "paused" | "done";

export function usePlayback(speed: number) {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [cursor, setCursor] = useState(0);
  const [playMs, setPlayMs] = useState(0);
  const visual = useRef<Visual>(createVisual(0));
  const cursorRef = useRef(0);
  const speedRef = useRef(speed);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const advance = useCallback((r: SearchResult, n: number) => {
    let c = cursorRef.current;
    const end = Math.min(totalSteps(r), c + n);
    while (c < end) applyStep(visual.current, r, c++);
    cursorRef.current = c;
    setCursor(c);
    return c >= totalSteps(r);
  }, []);

  useEffect(() => {
    if (status !== "running" || !result) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      acc += (dt * speedRef.current) / 1000;
      const n = Math.floor(acc);
      acc -= n;
      setPlayMs((p) => p + dt);
      if (advance(result, n)) {
        setStatus("done");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status, result, advance]);

  const load = (r: SearchResult, size: number) => {
    visual.current = createVisual(size);
    cursorRef.current = 0;
    setResult(r);
    setCursor(0);
    setPlayMs(0);
  };

  return {
    result,
    status,
    cursor,
    total: result ? totalSteps(result) : 0,
    playMs,
    visual,
    play: (r: SearchResult, size: number) => {
      load(r, size);
      setStatus("running");
    },

    stepFrom: (r: SearchResult, size: number) => {
      load(r, size);
      setStatus(advance(r, 1) ? "done" : "paused");
    },
    step: () => {
      if (result && status === "paused" && advance(result, 1))
        setStatus("done");
    },
    pause: () => status === "running" && setStatus("paused"),
    resume: () => status === "paused" && setStatus("running"),
    clear: () => {
      visual.current = createVisual(0);
      cursorRef.current = 0;
      setResult(null);
      setCursor(0);
      setPlayMs(0);
      setStatus("idle");
    },
  };
}

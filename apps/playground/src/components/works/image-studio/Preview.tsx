"use client";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import type { PreviewResult } from "./processor";

export type View = "after" | "original" | "split";

type Props = {
  preview: PreviewResult | null;
  original: ImageBitmap | null;
  view: View;
  split: number;
  onSplit: (v: number) => void;
  children?: React.ReactNode;
};

export default function Preview({ preview, original, view, split, onSplit, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmap = view === "original" ? original : preview?.after;
  const before = view === "split" ? preview?.before : undefined;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !bitmap) return;
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0);
    if (before && before.width === bitmap.width && before.height === bitmap.height) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, bitmap.width * split, bitmap.height);
      ctx.clip();
      ctx.clearRect(0, 0, bitmap.width * split, bitmap.height);
      ctx.drawImage(before, 0, 0);
      ctx.restore();
    }
  }, [bitmap, before, split]);

  const splitFromPointer = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    onSplit(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
  };

  return (
    <Stage>
      <Canvas ref={canvasRef} role="img" aria-label={view === "original" ? "원본 이미지" : "편집 결과 미리보기"} />
      {!bitmap && <Loading>처리 중…</Loading>}
      {before && (
        <SplitLayer
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            splitFromPointer(e);
          }}
          onPointerMove={(e) => e.buttons === 1 && splitFromPointer(e)}
        >
          <Badge style={{ left: "0.8rem" }}>전</Badge>
          <Badge style={{ right: "0.8rem" }}>후</Badge>
          <Divider
            style={{ left: `${split * 100}%` }}
            role="slider"
            tabIndex={0}
            aria-label="전후 비교 위치"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(split * 100)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") onSplit(Math.max(0, split - 0.05));
              if (e.key === "ArrowRight") onSplit(Math.min(1, split + 0.05));
            }}
          />
        </SplitLayer>
      )}
      {children}
    </Stage>
  );
}

const Stage = styled.div`
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  line-height: 0;
`;
const Canvas = styled.canvas`
  display: block;
  max-width: 100%;
  max-height: 65vh;
  border-radius: 0.6rem;
  background: repeating-conic-gradient(#8884 0% 25%, transparent 0% 50%) 50% / 1.6rem 1.6rem;
`;
const Loading = styled.p`
  padding: 8rem 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
const SplitLayer = styled.div`
  position: absolute;
  inset: 0;
  cursor: ew-resize;
  touch-action: none;
`;
const Divider = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0.2rem;
  transform: translateX(-50%);
  background: #fff;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.6);
  &::after {
    content: "⇆";
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    place-items: center;
    width: 3.2rem;
    height: 3.2rem;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #fff;
    color: #111;
    font-size: 1.6rem;
    line-height: 1;
    box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.4);
  }
  &:focus-visible::after {
    outline: 0.2rem solid ${({ theme }) => theme.colors.primary};
  }
`;
const Badge = styled.span`
  position: absolute;
  top: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.2;
  pointer-events: none;
`;

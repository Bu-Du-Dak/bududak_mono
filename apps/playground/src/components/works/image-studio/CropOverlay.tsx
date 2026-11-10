"use client";
import { useRef } from "react";
import styled from "styled-components";
import { type Crop, dragCorner, moveRect, type Size } from "./lib/geometry";

type Props = { rect: Crop; aspect: number | null; size: Size; onChange: (r: Crop) => void };

type Drag =
  | { kind: "corner"; anchor: [number, number] }
  | { kind: "move"; start: [number, number]; origin: Crop };

const CORNERS = [
  { id: "nw", x: 0, y: 0 },
  { id: "ne", x: 1, y: 0 },
  { id: "sw", x: 0, y: 1 },
  { id: "se", x: 1, y: 1 },
] as const;

export default function CropOverlay({ rect, aspect, size, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);

  const pointOf = (e: React.PointerEvent): [number, number] => {
    const b = ref.current!.getBoundingClientRect();
    return [Math.min(1, Math.max(0, (e.clientX - b.left) / b.width)), Math.min(1, Math.max(0, (e.clientY - b.top) / b.height))];
  };

  const begin = (e: React.PointerEvent, d: Drag) => {
    e.stopPropagation();
    ref.current!.setPointerCapture(e.pointerId);
    drag.current = d;
  };

  return (
    <Layer
      ref={ref}
      onPointerDown={(e) => begin(e, { kind: "corner", anchor: pointOf(e) })}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const p = pointOf(e);
        if (d.kind === "corner") onChange(dragCorner(d.anchor, p, aspect, size));
        else onChange(moveRect(d.origin, p[0] - d.start[0], p[1] - d.start[1]));
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
    >
      <Box
        style={{ left: `${rect.x * 100}%`, top: `${rect.y * 100}%`, width: `${rect.w * 100}%`, height: `${rect.h * 100}%` }}
        onPointerDown={(e) => begin(e, { kind: "move", start: pointOf(e), origin: rect })}
      >
        {CORNERS.map((c) => (
          <Handle
            key={c.id}
            style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%`, cursor: `${c.id}-resize` }}
            onPointerDown={(e) =>
              begin(e, { kind: "corner", anchor: [rect.x + (1 - c.x) * rect.w, rect.y + (1 - c.y) * rect.h] })
            }
          />
        ))}
      </Box>
    </Layer>
  );
}

const Layer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
  cursor: crosshair;
`;
const Box = styled.div`
  position: absolute;
  cursor: move;
  border: 0.15rem solid #fff;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.55);
  background:
    linear-gradient(to right, transparent 33.2%, #fff6 33.3%, #fff6 33.5%, transparent 33.6%, transparent 66.5%, #fff6 66.6%, #fff6 66.8%, transparent 66.9%),
    linear-gradient(to bottom, transparent 33.2%, #fff6 33.3%, #fff6 33.5%, transparent 33.6%, transparent 66.5%, #fff6 66.6%, #fff6 66.8%, transparent 66.9%);
`;
const Handle = styled.span`
  position: absolute;
  width: 2rem;
  height: 2rem;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.6);
`;

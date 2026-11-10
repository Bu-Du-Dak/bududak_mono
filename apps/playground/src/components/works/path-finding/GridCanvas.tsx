"use client";
import { useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import {
  type Cell,
  EMPTY,
  type Grid,
  lineBetween,
  moveEndpoint,
  setCells,
  WALL,
  WEIGHT,
} from "./lib/grid";
import { OPEN, PATH, VISITED, type Visual } from "./lib/playback";
import { canvasPaletteOf } from "./colors";

export type Tool = "wall" | "weight" | "erase";

type Props = {
  grid: Grid;
  cellSize: number;
  visual: Visual;
  cursor: number;
  tool: Tool;
  disabled: boolean;
  label: string;
  onEdit: (grid: Grid) => void;
};

type Drag =
  | { kind: "start" | "end" }
  | { kind: "paint"; cell: Cell; last: number };

const TOOL_CELL: Record<Tool, Cell> = {
  wall: WALL,
  weight: WEIGHT,
  erase: EMPTY,
};

export default function GridCanvas({
  grid,
  cellSize,
  visual,
  cursor,
  tool,
  disabled,
  label,
  onEdit,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drag = useRef<Drag | null>(null);
  const theme = useTheme();
  const width = grid.cols * cellSize;
  const height = grid.rows * cellSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const p = canvasPaletteOf(theme);
    const { mark, order, side, visitCount, current } = visual;
    const s = cellSize;
    ctx.fillStyle = p.empty;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < grid.cells.length; i++) {
      const x = (i % grid.cols) * s;
      const y = Math.floor(i / grid.cols) * s;
      const cell = grid.cells[i];
      if (cell === WALL) {
        ctx.fillStyle = p.wall;
        ctx.fillRect(x, y, s, s);
        continue;
      }
      if (cell === WEIGHT) {
        ctx.fillStyle = p.weight;
        ctx.fillRect(x, y, s, s);
      }
      const m = mark[i] ?? 0;
      if (m === OPEN || m === VISITED || m === PATH) {
        // 지형 칸은 반투명으로 덮어 지형이 비쳐 보이게
        ctx.globalAlpha = cell === WEIGHT ? 0.6 : 1;
        const t = visitCount > 1 ? order[i]! / (visitCount - 1) : 0;
        ctx.fillStyle =
          m === PATH
            ? p.path
            : m === OPEN
              ? p.open
              : side[i]
                ? p.visitedEnd(t)
                : p.visited(t);
        ctx.fillRect(x, y, s, s);
        ctx.globalAlpha = 1;
      }
    }

    // 격자선
    ctx.strokeStyle = p.line;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let c = 0; c <= grid.cols; c++) {
      ctx.moveTo(c * s, 0);
      ctx.lineTo(c * s, height);
    }
    for (let r = 0; r <= grid.rows; r++) {
      ctx.moveTo(0, r * s);
      ctx.lineTo(width, r * s);
    }
    ctx.stroke();

    const center = (i: number) =>
      [
        (i % grid.cols) * s + s / 2,
        Math.floor(i / grid.cols) * s + s / 2,
      ] as const;
    if (current >= 0) {
      const [cx, cy] = center(current);
      ctx.strokeStyle = p.current;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(cx - s / 2 + 1.5, cy - s / 2 + 1.5, s - 3, s - 3);
    }

    const dot = (
      i: number,
      color: string,
      letter: string,
      half?: "left" | "right",
    ) => {
      const [cx, cy] = center(i);
      ctx.fillStyle = color;
      ctx.beginPath();
      if (half)
        ctx.arc(
          cx,
          cy,
          s * 0.42,
          half === "left" ? Math.PI / 2 : -Math.PI / 2,
          half === "left" ? -Math.PI / 2 : Math.PI / 2,
        );
      else ctx.arc(cx, cy, s * 0.42, 0, Math.PI * 2);
      ctx.fill();
      if (half) return;
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(s * 0.5)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(letter, cx, cy + 0.5);
    };
    const same = grid.start === grid.end;
    dot(grid.start, p.start, "S", same ? "left" : undefined);
    dot(grid.end, p.end, "E", same ? "right" : undefined);
  }, [grid, cellSize, width, height, visual, cursor, theme]);

  const cellAt = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const c = Math.floor(((e.clientX - rect.left) / rect.width) * grid.cols);
    const r = Math.floor(((e.clientY - rect.top) / rect.height) * grid.rows);
    if (r < 0 || c < 0 || r >= grid.rows || c >= grid.cols) return -1;
    return r * grid.cols + c;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled || e.button !== 0) return;
    const i = cellAt(e);
    if (i < 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (i === grid.end) drag.current = { kind: "end" };
    else if (i === grid.start) drag.current = { kind: "start" };
    else {
      // 같은 칸칠하면 지워주기
      const target = TOOL_CELL[tool];
      const cell =
        grid.cells[i] === target && target !== EMPTY ? EMPTY : target;
      drag.current = { kind: "paint", cell, last: i };
      onEdit(setCells(grid, [i], cell));
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || disabled) return;
    const i = cellAt(e);
    if (i < 0) return;
    if (d.kind === "paint") {
      if (i === d.last) return;
      onEdit(setCells(grid, lineBetween(grid, d.last, i), d.cell));
      d.last = i;
    } else if (grid[d.kind] !== i) {
      onEdit(moveEndpoint(grid, d.kind, i));
    }
  };

  const end = () => {
    drag.current = null;
  };

  return (
    <Canvas
      ref={canvasRef}
      style={{ width, height }}
      $disabled={disabled}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      role="img"
      aria-label={label}
    />
  );
}

const Canvas = styled.canvas<{ $disabled: boolean }>`
  display: block;
  touch-action: none; /* 터치 드래그 스크롤로 작동하지 않게 해주기 */
  border-radius: 0.6rem;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "crosshair")};
`;

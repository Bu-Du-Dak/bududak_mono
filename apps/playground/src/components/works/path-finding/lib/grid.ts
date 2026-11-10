export const EMPTY = 0;
export const WALL = 1;
export const WEIGHT = 2;
export type Cell = typeof EMPTY | typeof WALL | typeof WEIGHT;

export const WEIGHT_COST = 5;

export type Grid = {
  rows: number;
  cols: number;
  cells: Uint8Array;
  start: number;
  end: number;
};

export const toIndex = (g: Grid, r: number, c: number) => r * g.cols + c;
export const toRowCol = (g: Grid, i: number) =>
  [Math.floor(i / g.cols), i % g.cols] as const;

export function createGrid(rows: number, cols: number): Grid {
  const mid = Math.floor(rows / 2);
  return {
    rows,
    cols,
    cells: new Uint8Array(rows * cols),
    start: mid * cols + Math.floor(cols / 4),
    end: mid * cols + Math.floor((cols * 3) / 4),
  };
}

export const moveCost = (g: Grid, i: number) =>
  g.cells[i] === WEIGHT ? WEIGHT_COST : 1;

export function neighbors(g: Grid, i: number): number[] {
  const [r, c] = toRowCol(g, i);
  const out: number[] = [];
  if (r > 0) out.push(i - g.cols);
  if (c < g.cols - 1) out.push(i + 1);
  if (r < g.rows - 1) out.push(i + g.cols);
  if (c > 0) out.push(i - 1);
  return out.filter((n) => g.cells[n] !== WALL);
}

export function setCells(g: Grid, indices: number[], cell: Cell): Grid {
  const cells = g.cells.slice();
  for (const i of indices) if (i !== g.start && i !== g.end) cells[i] = cell;
  return { ...g, cells };
}

export function moveEndpoint(g: Grid, which: "start" | "end", i: number): Grid {
  if (g[which] === i) return g;
  const cells = g.cells.slice();
  cells[i] = EMPTY;
  return { ...g, cells, [which]: i };
}

export function resizeGrid(g: Grid, rows: number, cols: number): Grid {
  if (g.rows === rows && g.cols === cols) return g;
  const next = createGrid(rows, cols);
  for (let r = 0; r < Math.min(rows, g.rows); r++)
    for (let c = 0; c < Math.min(cols, g.cols); c++)
      next.cells[r * cols + c] = g.cells[toIndex(g, r, c)]!;
  const clamp = (i: number) => {
    const [r, c] = toRowCol(g, i);
    return Math.min(r, rows - 1) * cols + Math.min(c, cols - 1);
  };
  next.start = clamp(g.start);
  next.end = clamp(g.end);
  next.cells[next.start] = EMPTY;
  next.cells[next.end] = EMPTY;
  return next;
}

export function lineBetween(g: Grid, from: number, to: number): number[] {
  let [r0, c0] = toRowCol(g, from);
  const [r1, c1] = toRowCol(g, to);
  const dr = Math.abs(r1 - r0);
  const dc = Math.abs(c1 - c0);
  const sr = r0 < r1 ? 1 : -1;
  const sc = c0 < c1 ? 1 : -1;
  let err = dc - dr;
  const out = [toIndex(g, r0, c0)];
  while (r0 !== r1 || c0 !== c1) {
    const e2 = err * 2;
    if (e2 > -dr) {
      err -= dr;
      c0 += sc;
    }
    if (e2 < dc) {
      err += dc;
      r0 += sr;
    }
    out.push(toIndex(g, r0, c0));
  }
  return out;
}

export const hasWeights = (g: Grid) => g.cells.includes(WEIGHT);

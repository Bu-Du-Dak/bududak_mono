import { EMPTY, type Grid, WALL, WEIGHT } from "./lib/grid";

const KEY = "playground:pathfinding:map";

export function saveMap(g: Grid) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        rows: g.rows,
        cols: g.cols,
        start: g.start,
        end: g.end,
        cells: g.cells.join(""),
      }),
    );
    return true;
  } catch {
    return false;
  }
}

export function loadMap(): Grid | null {
  try {
    const d: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (typeof d !== "object" || d === null) return null;
    const { rows, cols, start, end, cells } = d as Record<string, unknown>;
    const int = (v: unknown, max: number): v is number =>
      Number.isInteger(v) && (v as number) >= 0 && (v as number) < max;
    if (!int(rows, 200) || !int(cols, 200) || rows < 1 || cols < 1) return null;
    const size = rows * cols;
    if (
      !int(start, size) ||
      !int(end, size) ||
      typeof cells !== "string" ||
      cells.length !== size
    )
      return null;
    const arr = Uint8Array.from(cells, (ch) => Number(ch));
    if (!arr.every((v) => v === EMPTY || v === WALL || v === WEIGHT))
      return null;
    arr[start] = EMPTY;
    arr[end] = EMPTY;
    return { rows, cols, start, end, cells: arr };
  } catch {
    return null;
  }
}

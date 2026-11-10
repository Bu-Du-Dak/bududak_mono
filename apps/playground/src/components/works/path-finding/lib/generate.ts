import { EMPTY, type Grid, WALL } from "./grid";

export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomWalls(
  g: Grid,
  density: number,
  rand: () => number = Math.random,
): Grid {
  const cells = new Uint8Array(g.cells.length);
  for (let i = 0; i < cells.length; i++) {
    if (i !== g.start && i !== g.end && rand() < density) cells[i] = WALL;
  }
  return { ...g, cells };
}

export function maze(g: Grid, rand: () => number = Math.random): Grid {
  const { rows, cols } = g;
  const cells = new Uint8Array(rows * cols).fill(WALL);
  const odd = (v: number, max: number) =>
    Math.max(1, Math.min(max % 2 === 1 ? max - 2 : max - 3, v | 1));
  const at = (r: number, c: number) => r * cols + c;

  const stack: [number, number][] = [[1, 1]];
  cells[at(1, 1)] = EMPTY;
  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1]!;
    const options = (
      [
        [r - 2, c],
        [r, c + 2],
        [r + 2, c],
        [r, c - 2],
      ] as [number, number][]
    ).filter(
      ([nr, nc]) =>
        nr > 0 &&
        nc > 0 &&
        nr < rows - 1 &&
        nc < cols - 1 &&
        cells[at(nr, nc)] === WALL,
    );
    if (options.length === 0) {
      stack.pop();
      continue;
    }
    const [nr, nc] = options[Math.floor(rand() * options.length)]!;
    cells[at((r + nr) / 2, (c + nc) / 2)] = EMPTY;
    cells[at(nr, nc)] = EMPTY;
    stack.push([nr, nc]);
  }

  const snap = (i: number) =>
    at(odd(Math.floor(i / cols), rows), odd(i % cols, cols));
  return { ...g, cells, start: snap(g.start), end: snap(g.end) };
}

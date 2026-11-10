import type { SearchResult } from "./search";

export const NONE = 0;
export const OPEN = 1;
export const VISITED = 2;
export const PATH = 3;

export type Visual = {
  mark: Uint8Array;
  order: Int32Array;
  side: Uint8Array;
  visitCount: number;
  current: number;
};

export const createVisual = (size: number): Visual => ({
  mark: new Uint8Array(size),
  order: new Int32Array(size),
  side: new Uint8Array(size),
  visitCount: 0,
  current: -1,
});

export const totalSteps = (r: SearchResult) => r.events.length + r.path.length;

export function applyStep(v: Visual, r: SearchResult, step: number) {
  if (step < r.events.length) {
    const { type, node, side } = r.events[step]!;
    if (type === "open") {
      if (v.mark[node] !== VISITED) v.mark[node] = OPEN;
    } else {
      v.mark[node] = VISITED;
      v.order[node] = v.visitCount++;
      v.side[node] = side ?? 0;
      v.current = node;
    }
  } else {
    v.current = -1;
    v.mark[r.path[step - r.events.length]!] = PATH;
  }
}

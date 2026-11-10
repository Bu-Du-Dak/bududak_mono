import { MinHeap } from "./heap";
import { type Grid, moveCost, neighbors, toRowCol } from "./grid";

export type SearchEvent = { type: "open" | "visit"; node: number; side?: 1 };

export type SearchResult = {
  events: SearchEvent[];
  path: number[];
  cost: number;
  visited: number;
};

export type AlgorithmId =
  | "bfs"
  | "bidirectional"
  | "dfs"
  | "dijkstra"
  | "astar"
  | "greedy";

function buildPath(g: Grid, prev: Int32Array, reached: boolean) {
  if (!reached) return { path: [], cost: 0 };
  const path = [g.end];
  while (path[path.length - 1] !== g.start)
    path.push(prev[path[path.length - 1]!]!);
  path.reverse();
  let cost = 0;
  for (let k = 1; k < path.length; k++) cost += moveCost(g, path[k]!);
  return { path, cost };
}

export function bfs(g: Grid, record = true): SearchResult {
  const n = g.rows * g.cols;
  const prev = new Int32Array(n).fill(-1);
  const seen = new Uint8Array(n);
  const queue = new Int32Array(n);
  const events: SearchEvent[] = [];
  let head = 0;
  let tail = 0;
  let visited = 0;
  let reached = false;

  queue[tail++] = g.start;
  seen[g.start] = 1;
  if (record) events.push({ type: "open", node: g.start });
  while (head < tail) {
    const cur = queue[head++]!;
    visited++;
    if (record) events.push({ type: "visit", node: cur });
    if (cur === g.end) {
      reached = true;
      break;
    }
    for (const nb of neighbors(g, cur)) {
      if (seen[nb]) continue;
      seen[nb] = 1;
      prev[nb] = cur;
      queue[tail++] = nb;
      if (record) events.push({ type: "open", node: nb });
    }
  }
  return { events, visited, ...buildPath(g, prev, reached) };
}

type Entry = { node: number; f: number; h: number; seq: number };
const less = (a: Entry, b: Entry) =>
  a.f !== b.f ? a.f < b.f : a.h !== b.h ? a.h < b.h : a.seq < b.seq;

function bestFirst(
  g: Grid,
  h: (i: number) => number,
  record: boolean,
  greedy = false,
): SearchResult {
  const n = g.rows * g.cols;
  const dist = new Float64Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const closed = new Uint8Array(n);
  const heap = new MinHeap<Entry>(less);
  const events: SearchEvent[] = [];
  let seq = 0;
  let visited = 0;
  let reached = false;

  dist[g.start] = 0;
  heap.push({ node: g.start, f: h(g.start), h: h(g.start), seq: seq++ });
  const priority = (d: number, hn: number) => (greedy ? hn : d + hn);
  if (record) events.push({ type: "open", node: g.start });
  while (heap.size > 0) {
    const { node: cur } = heap.pop()!;
    if (closed[cur]) continue;
    closed[cur] = 1;
    visited++;
    if (record) events.push({ type: "visit", node: cur });
    if (cur === g.end) {
      reached = true;
      break;
    }
    for (const nb of neighbors(g, cur)) {
      if (closed[nb]) continue;
      const d = dist[cur]! + moveCost(g, nb);
      if (d >= dist[nb]!) continue;
      dist[nb] = d;
      prev[nb] = cur;
      const hn = h(nb);
      heap.push({ node: nb, f: priority(d, hn), h: hn, seq: seq++ });
      if (record) events.push({ type: "open", node: nb });
    }
  }
  return { events, visited, ...buildPath(g, prev, reached) };
}

export const dijkstra = (g: Grid, record = true) =>
  bestFirst(g, () => 0, record);

const manhattanTo = (g: Grid) => {
  const [er, ec] = toRowCol(g, g.end);
  return (i: number) => {
    const [r, c] = toRowCol(g, i);
    return Math.abs(r - er) + Math.abs(c - ec);
  };
};
export const astar = (g: Grid, record = true) =>
  bestFirst(g, manhattanTo(g), record);

export const greedy = (g: Grid, record = true) =>
  bestFirst(g, manhattanTo(g), record, true);

export function dfs(g: Grid, record = true): SearchResult {
  const n = g.rows * g.cols;
  const prev = new Int32Array(n).fill(-1);
  const done = new Uint8Array(n);
  const stack: [node: number, parent: number][] = [[g.start, -1]];
  const events: SearchEvent[] = [];
  let visited = 0;
  let reached = false;

  if (record) events.push({ type: "open", node: g.start });
  while (stack.length > 0) {
    const [cur, parent] = stack.pop()!;
    if (done[cur]) continue;
    done[cur] = 1;
    prev[cur] = parent;
    visited++;
    if (record) events.push({ type: "visit", node: cur });
    if (cur === g.end) {
      reached = true;
      break;
    }
    for (const nb of neighbors(g, cur).reverse()) {
      if (done[nb]) continue;
      stack.push([nb, cur]);
      if (record) events.push({ type: "open", node: nb });
    }
  }
  return { events, visited, ...buildPath(g, prev, reached) };
}

export function bidirectional(g: Grid, record = true): SearchResult {
  const n = g.rows * g.cols;
  const events: SearchEvent[] = [];
  if (g.start === g.end) {
    if (record)
      events.push(
        { type: "open", node: g.start },
        { type: "visit", node: g.start },
      );
    return { events, path: [g.start], cost: 0, visited: 1 };
  }
  const dist = [
    new Int32Array(n).fill(-1),
    new Int32Array(n).fill(-1),
  ] as const;
  const prev = [
    new Int32Array(n).fill(-1),
    new Int32Array(n).fill(-1),
  ] as const;
  const frontier: number[][] = [[g.start], [g.end]];
  dist[0][g.start] = 0;
  dist[1][g.end] = 0;
  if (record)
    events.push(
      { type: "open", node: g.start },
      { type: "open", node: g.end, side: 1 },
    );
  let visited = 0;
  let best = Infinity;
  let meetA = -1;
  let meetB = -1;

  while (
    frontier[0]!.length > 0 &&
    frontier[1]!.length > 0 &&
    best === Infinity
  ) {
    const side = frontier[0]!.length <= frontier[1]!.length ? 0 : 1;
    const other = 1 - side;
    const next: number[] = [];
    for (const cur of frontier[side]!) {
      visited++;
      if (record)
        events.push(
          side
            ? { type: "visit", node: cur, side: 1 }
            : { type: "visit", node: cur },
        );
      for (const nb of neighbors(g, cur)) {
        if (dist[other]![nb]! >= 0) {
          const total = dist[side]![cur]! + 1 + dist[other]![nb]!;
          if (total < best) {
            best = total;
            [meetA, meetB] = side === 0 ? [cur, nb] : [nb, cur];
          }
        }
        if (dist[side]![nb]! >= 0) continue;
        dist[side]![nb] = dist[side]![cur]! + 1;
        prev[side]![nb] = cur;
        next.push(nb);
        if (record)
          events.push(
            side
              ? { type: "open", node: nb, side: 1 }
              : { type: "open", node: nb },
          );
      }
    }
    frontier[side] = next;
  }

  if (best === Infinity) return { events, visited, path: [], cost: 0 };
  const path: number[] = [];
  for (let v = meetA; v !== -1; v = prev[0][v]!) path.push(v);
  path.reverse();
  for (let v = meetB; v !== -1; v = prev[1][v]!) path.push(v);
  let cost = 0;
  for (let k = 1; k < path.length; k++) cost += moveCost(g, path[k]!);
  return { events, visited, path, cost };
}

export type Guarantee = "steps" | "cost" | "none";
export const ALGORITHMS: Record<
  AlgorithmId,
  {
    label: string;
    run: (g: Grid, record?: boolean) => SearchResult;
    weighted: boolean;
    guarantee: Guarantee;
    description: string;
  }
> = {
  bfs: {
    label: "BFS",
    run: bfs,
    weighted: false,
    guarantee: "steps",
    description:
      "가까운 칸부터 물결처럼 고르게 퍼져요. 칸 수 기준 최단 경로를 보장해요.",
  },
  bidirectional: {
    label: "양방향 BFS",
    run: bidirectional,
    weighted: false,
    guarantee: "steps",
    description:
      "시작점과 도착점 양쪽에서 동시에 퍼지다 가운데서 만나요. BFS와 같은 경로를 더 적은 방문으로 찾아요.",
  },
  dfs: {
    label: "DFS",
    run: dfs,
    weighted: false,
    guarantee: "none",
    description:
      "한 방향으로 갈 수 있는 데까지 파고든 뒤 되돌아와요. 경로는 찾지만 대개 아주 길어요.",
  },
  dijkstra: {
    label: "Dijkstra",
    run: dijkstra,
    weighted: true,
    guarantee: "cost",
    description:
      "지금까지 비용이 가장 적은 칸부터 넓혀가요. 지형 비용까지 고려한 최소 비용 경로를 보장해요.",
  },
  astar: {
    label: "A*",
    run: astar,
    weighted: true,
    guarantee: "cost",
    description:
      "지금까지 비용 + 도착점까지 남은 거리로 순서를 정해요. Dijkstra와 같은 최소 비용 경로를 더 적은 방문으로 찾아요.",
  },
  greedy: {
    label: "Greedy",
    run: greedy,
    weighted: false,
    guarantee: "none",
    description:
      "도착점까지 남은 거리만 보고 달려가요. 아주 빠르지만 벽이나 지형에 막히면 돌아가는 경로가 나와요.",
  },
};

export function measure(
  run: (g: Grid, record?: boolean) => SearchResult,
  g: Grid,
) {
  let runs = 0;
  const t0 = performance.now();
  let elapsed = 0;
  do {
    run(g, false);
    runs++;
    elapsed = performance.now() - t0;
  } while (elapsed < 20 && runs < 2000);
  return elapsed / runs;
}

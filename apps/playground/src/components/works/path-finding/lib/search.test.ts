import {
  EMPTY,
  WALL,
  WEIGHT,
  type Grid,
  createGrid,
  setCells,
  toIndex,
  neighbors,
} from "./grid";
import {
  ALGORITHMS,
  astar,
  bfs,
  bidirectional,
  dfs,
  dijkstra,
  greedy,
} from "./search";
import { maze, randomWalls, seededRandom } from "./generate";
import { MinHeap } from "./heap";
import { applyStep, createVisual, PATH, totalSteps, VISITED } from "./playback";

const ALL = Object.fromEntries(
  Object.entries(ALGORITHMS).map(([id, a]) => [id, a.run]),
);

const SHORTEST = { bfs, bidirectional, dijkstra, astar };

const make = (
  rows: number,
  cols: number,
  start: [number, number],
  end: [number, number],
): Grid => {
  const g = createGrid(rows, cols);
  return { ...g, start: toIndex(g, ...start), end: toIndex(g, ...end) };
};

const assertValidPath = (g: Grid, path: number[]) => {
  expect(path[0]).toBe(g.start);
  expect(path[path.length - 1]).toBe(g.end);
  for (let k = 1; k < path.length; k++)
    expect(neighbors(g, path[k - 1]!)).toContain(path[k]);
};

describe("MinHeap", () => {
  it("작은 값부터 꺼낸다", () => {
    const heap = new MinHeap<number>((a, b) => a < b);
    const rand = seededRandom(1);
    const values = Array.from({ length: 200 }, () => Math.floor(rand() * 1000));
    values.forEach((v) => heap.push(v));
    const out: number[] = [];
    while (heap.size) out.push(heap.pop()!);
    expect(out).toEqual([...values].sort((a, b) => a - b));
    expect(heap.pop()).toBeUndefined();
  });
});

describe.each(Object.entries(SHORTEST))("%s: 칸 수 최단", (_, run) => {
  it("빈 지도: 최단 거리 = Manhattan 거리", () => {
    const g = make(7, 9, [1, 1], [5, 7]);
    const r = run(g);
    expect(r.path.length - 1).toBe(4 + 6);
    expect(r.cost).toBe(10);
    assertValidPath(g, r.path);
  });

  it("벽을 돌아간다", () => {
    let g = make(5, 5, [2, 0], [2, 4]);
    // 2열에 세로 벽, 맨 아래 칸만 뚫림
    g = setCells(
      g,
      [0, 1, 2, 3].map((r) => toIndex(g, r, 2)),
      WALL,
    );
    const r = run(g);
    assertValidPath(g, r.path);
    expect(r.path).toContain(toIndex(g, 4, 2));
    expect(r.path.length - 1).toBe(8);
  });
});

describe.each(Object.entries(ALL))("%s: 공통", (_, run) => {
  it("시작점 = 도착점", () => {
    const g = make(3, 3, [1, 1], [1, 1]);
    const r = run(g);
    expect(r.path).toEqual([g.start]);
    expect(r.cost).toBe(0);
    expect(r.visited).toBe(1);
  });

  it("경로 없음", () => {
    let g = make(3, 5, [1, 0], [1, 4]);
    g = setCells(
      g,
      [0, 1, 2].map((r) => toIndex(g, r, 2)),
      WALL,
    );
    const r = run(g);
    expect(r.path).toEqual([]);
    expect(r.cost).toBe(0);
    expect(r.visited).toBeGreaterThan(0);
  });

  it("벽이 있어도 이어진 경로를 찾는다", () => {
    const g = randomWalls(make(15, 21, [0, 0], [14, 20]), 0.2, seededRandom(7));
    const r = run(g);
    if (r.path.length) assertValidPath(g, r.path);
    expect(r.path.length > 0).toBe(bfs(g).path.length > 0);
  });

  it("기록 없이 실행해도 같은 결과", () => {
    const g = randomWalls(
      make(15, 21, [0, 0], [14, 20]),
      0.25,
      seededRandom(3),
    );
    const a = run(g, true);
    const b = run(g, false);
    expect(b.events).toEqual([]);
    expect({ ...b, events: undefined }).toEqual({ ...a, events: undefined });
  });

  it("방문 이벤트 수 = visited", () => {
    const g = randomWalls(
      make(15, 21, [0, 0], [14, 20]),
      0.25,
      seededRandom(5),
    );
    const r = run(g);
    expect(r.events.filter((e) => e.type === "visit").length).toBe(r.visited);
  });
});

describe("가중치", () => {
  // 직진(지형 3칸, 비용 5) vs 돌아가기
  const weighted = () => {
    let g = make(3, 5, [1, 0], [1, 4]);
    g = setCells(
      g,
      [1, 2, 3].map((c) => toIndex(g, 1, c)),
      WEIGHT,
    );
    return g;
  };

  it("Dijkstra 와 A* 는 지형을 피해 최소 비용 경로를 찾는다", () => {
    const g = weighted();
    for (const run of [dijkstra, astar]) {
      const r = run(g);
      assertValidPath(g, r.path);
      expect(r.cost).toBe(6); // 위나 아래로 돌아감: 6칸 × 1
    }
  });

  it("BFS 는 칸 수만 보고 지형을 지나간다", () => {
    const r = bfs(weighted());
    expect(r.path.length - 1).toBe(4);
    expect(r.cost).toBe(5 + 5 + 5 + 1);
  });

  it("무작위 지도 300개: A* 비용 = Dijkstra 비용 ≤ BFS 비용, 도달 여부 일치", () => {
    const rand = seededRandom(42);
    for (let t = 0; t < 300; t++) {
      const rows = 5 + Math.floor(rand() * 15);
      const cols = 5 + Math.floor(rand() * 25);
      let g = randomWalls(createGrid(rows, cols), rand() * 0.4, rand);
      g = {
        ...g,
        start: Math.floor(rand() * rows * cols),
        end: Math.floor(rand() * rows * cols),
      };
      const cells = g.cells.slice();
      for (let i = 0; i < cells.length; i++)
        if (cells[i] === EMPTY && rand() < 0.3) cells[i] = WEIGHT;
      cells[g.start] = EMPTY;
      cells[g.end] = EMPTY;
      g = { ...g, cells };

      const [b, d, a] = [bfs(g), dijkstra(g), astar(g)];
      const [bi, df, gr] = [bidirectional(g), dfs(g), greedy(g)];
      expect(a.cost).toBe(d.cost);
      // 양방향 BFS 는 BFS 와 같은 칸 수
      expect(bi.path.length).toBe(b.path.length);
      for (const r of [bi, df, gr]) {
        expect(r.path.length > 0).toBe(d.path.length > 0);
        if (r.path.length) {
          assertValidPath(g, r.path);
          expect(r.cost).toBeGreaterThanOrEqual(d.cost);
        }
      }
      expect(a.path.length > 0).toBe(d.path.length > 0);
      expect(b.path.length > 0).toBe(d.path.length > 0);
      if (d.path.length) {
        expect(b.cost).toBeGreaterThanOrEqual(d.cost);
        assertValidPath(g, a.path);
        assertValidPath(g, b.path);
        expect(a.visited).toBeLessThanOrEqual(d.visited);
      }
    }
  });
});

describe("특징", () => {
  it("양방향 BFS 는 빈 지도에서 BFS 보다 적게 방문한다", () => {
    const g = make(21, 31, [10, 2], [10, 28]);
    expect(bidirectional(g).visited).toBeLessThan(bfs(g).visited);
  });

  it("Greedy 는 빈 지도에서 A* 보다 적거나 같게 방문한다", () => {
    const g = make(21, 31, [3, 2], [17, 28]);
    expect(greedy(g).visited).toBeLessThanOrEqual(astar(g).visited);
  });

  it("양방향 BFS 의 도착점 쪽 이벤트에는 side 표시가 붙는다", () => {
    const g = make(9, 9, [4, 0], [4, 8]);
    const sides = new Set(bidirectional(g).events.map((e) => e.side ?? 0));
    expect(sides).toEqual(new Set([0, 1]));
  });
});

describe("미로", () => {
  it("시작·도착점이 통로이고 서로 연결되어 있다", () => {
    for (const [rows, cols] of [
      [21, 31],
      [11, 11],
      [12, 20],
    ] as const) {
      const g = maze(createGrid(rows, cols), seededRandom(rows));
      expect(g.cells[g.start]).toBe(EMPTY);
      expect(g.cells[g.end]).toBe(EMPTY);
      expect(bfs(g).path.length).toBeGreaterThan(0);
    }
  });
});

describe("재생", () => {
  it("모든 단계를 적용하면 방문 칸 수와 경로가 결과와 같다", () => {
    const g = make(9, 9, [0, 0], [8, 8]);
    const r = astar(g);
    const v = createVisual(81);
    for (let s = 0; s < totalSteps(r); s++) applyStep(v, r, s);
    expect(v.visitCount).toBe(r.visited);
    expect(r.path.every((i) => v.mark[i] === PATH)).toBe(true);
    expect(
      v.mark.filter((m) => m === VISITED || m === PATH).length,
    ).toBeGreaterThanOrEqual(r.path.length);
  });
});

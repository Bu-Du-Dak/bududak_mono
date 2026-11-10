"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import GridCanvas, { type Tool } from "./GridCanvas";
import Toolbar from "./Toolbar";
import SidePanel, { type Metrics } from "./SidePanel";
import { usePlayback } from "./usePlayback";
import { createGrid, type Grid, hasWeights, resizeGrid } from "./lib/grid";
import {
  ALGORITHMS,
  type AlgorithmId,
  measure,
  type SearchResult,
} from "./lib/search";
import { maze, randomWalls } from "./lib/generate";
import { loadMap, saveMap } from "./storage";
import {
  breakpoints,
  media,
} from "../../../../../../packages/ui/src/styles/breakPoints";

const odd = (n: number) => (n % 2 === 0 ? n - 1 : n);

function dimsFor(width: number) {
  const mobile = window.innerWidth < breakpoints.tablet;
  const cols = Math.max(9, odd(Math.floor(width / (mobile ? 18 : 22))));
  const rows = Math.min(
    41,
    Math.max(9, odd(Math.round(cols * (mobile ? 1.1 : 0.55)))),
  );
  return { rows, cols, cellSize: Math.floor(width / cols) };
}

const speedOf = (level: number) => Math.round(10 * Math.pow(300, level / 100));

const toMetrics = (r: SearchResult, timeMs: number): Metrics => ({
  reached: r.path.length > 0,
  visited: r.visited,
  length: Math.max(0, r.path.length - 1),
  cost: r.cost,
  timeMs,
});

export default function PathFinding() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(0);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [algorithm, setAlgorithm] = useState<AlgorithmId>("astar");
  const [tool, setTool] = useState<Tool>("wall");
  const [density, setDensity] = useState(0.25);
  const [speedLevel, setSpeedLevel] = useState(50);
  const [metrics, setMetrics] = useState<Partial<Record<AlgorithmId, Metrics>>>(
    {},
  );
  const [animated, setAnimated] = useState<AlgorithmId | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const speed = speedOf(speedLevel);
  const playback = usePlayback(speed);
  const clearRef = useRef(playback.clear);
  useEffect(() => {
    clearRef.current = playback.clear;
  });
  const dimsRef = useRef<{ rows: number; cols: number } | null>(null);

  // 화면 너비가 바뀌면 격자 크기 다시 계산
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(([entry]) => {
      const { rows, cols, cellSize } = dimsFor(entry!.contentRect.width);
      setCellSize(cellSize);
      const prev = dimsRef.current;
      if (prev && prev.rows === rows && prev.cols === cols) return;
      dimsRef.current = { rows, cols };
      clearRef.current();
      setMetrics({});
      setAnimated(null);
      setGrid((g) => (g ? resizeGrid(g, rows, cols) : createGrid(rows, cols)));
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  const locked = playback.status === "running";

  const changeMap = (next: Grid) => {
    setGrid(next);
    if (playback.status !== "idle") playback.clear();
    setMetrics({});
    setAnimated(null);
  };

  const compute = (g: Grid, id: AlgorithmId) => {
    const { run } = ALGORITHMS[id];
    const r = run(g);
    const timeMs = measure(run, g);
    setMetrics((m) => ({ ...m, [id]: toMetrics(r, timeMs) }));
    return r;
  };

  if (!grid)
    return (
      <Layout>
        <Main ref={boxRef} style={{ minHeight: "40rem" }} />
      </Layout>
    );
  const size = grid.rows * grid.cols;

  const onMain = () => {
    if (playback.status === "running") return playback.pause();
    if (playback.status === "paused") return playback.resume();
    setAnimated(algorithm);
    playback.play(compute(grid, algorithm), size);
  };

  const onStep = () => {
    if (playback.status === "paused") return playback.step();
    setAnimated(algorithm);
    playback.stepFrom(compute(grid, algorithm), size);
  };

  const r = playback.result;
  const statusText =
    playback.status === "done" && r
      ? r.path.length
        ? `탐색 완료: 경로 ${r.path.length - 1}칸, 비용 ${r.cost}, 방문 ${r.visited}칸`
        : `도착점에 도달할 수 없어요 (방문 ${r.visited}칸)`
      : playback.status === "idle"
        ? "지도를 편집한 뒤 실행을 눌러보세요."
        : `${playback.status === "paused" ? "일시정지" : "탐색 중"} · ${playback.cursor} / ${playback.total} 단계`;

  return (
    <Layout>
      <Main ref={boxRef}>
        <Toolbar
          algorithm={algorithm}
          onAlgorithm={(id) => {
            setAlgorithm(id);
            playback.clear();
          }}
          status={playback.status}
          speedLevel={speedLevel}
          speed={speed}
          onSpeedLevel={setSpeedLevel}
          onMain={onMain}
          onStep={onStep}
          onClear={playback.clear}
          hasWeights={hasWeights(grid)}
        />
        <Box>
          <GridCanvas
            grid={grid}
            cellSize={cellSize}
            visual={playback.visual.current}
            cursor={playback.cursor}
            tool={tool}
            disabled={locked}
            label={`${grid.rows}×${grid.cols} 격자 지도. ${statusText}`}
            onEdit={changeMap}
          />
        </Box>
        <Status aria-live="polite">{statusText}</Status>
      </Main>
      <SidePanel
        locked={locked}
        tool={tool}
        onTool={setTool}
        density={density}
        onDensity={setDensity}
        onRandom={() => changeMap(randomWalls(grid, density))}
        onMaze={() => changeMap(maze(grid))}
        onReset={() => changeMap(createGrid(grid.rows, grid.cols))}
        onSave={() =>
          setSaveMessage(
            saveMap(grid) ? "저장했어요" : "저장할 수 없는 환경이에요",
          )
        }
        onLoad={() => {
          const saved = loadMap();
          if (!saved) return setSaveMessage("저장된 지도가 없어요");
          changeMap(resizeGrid(saved, grid.rows, grid.cols));
          setSaveMessage(
            saved.rows === grid.rows && saved.cols === grid.cols
              ? "불러왔어요"
              : "화면 크기에 맞춰 불러왔어요",
          );
        }}
        saveMessage={saveMessage}
        metrics={metrics}
        animated={
          animated && r ? { id: animated, playMs: playback.playMs } : null
        }
        onCompare={() =>
          (Object.keys(ALGORITHMS) as AlgorithmId[]).forEach((id) =>
            compute(grid, id),
          )
        }
      />
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 30rem;
  gap: 2.4rem;
  align-items: start;
  ${media.lt("web")} {
    grid-template-columns: minmax(0, 1fr);
  }
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-width: 0;
`;
const Box = styled.div`
  width: 100%;
`;
const Status = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

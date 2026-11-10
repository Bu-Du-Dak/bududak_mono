"use client";
import styled, { useTheme } from "styled-components";
import { ALGORITHMS, type AlgorithmId } from "./lib/search";
import { WEIGHT_COST } from "./lib/grid";
import type { Tool } from "./GridCanvas";
import { paletteOf } from "./colors";
import { Button, Muted, Panel, Row } from "../common/styles";

export type Metrics = {
  reached: boolean;
  visited: number;
  length: number;
  cost: number;
  timeMs: number;
};

type Props = {
  locked: boolean;
  tool: Tool;
  onTool: (t: Tool) => void;
  density: number;
  onDensity: (d: number) => void;
  onRandom: () => void;
  onMaze: () => void;
  onReset: () => void;
  onSave: () => void;
  onLoad: () => void;
  saveMessage: string;
  metrics: Partial<Record<AlgorithmId, Metrics>>;
  animated: { id: AlgorithmId; playMs: number } | null;
  onCompare: () => void;
};

const TOOLS: { id: Tool; label: string }[] = [
  { id: "wall", label: "벽" },
  { id: "weight", label: `지형 (비용 ${WEIGHT_COST})` },
  { id: "erase", label: "지우개" },
];

const ms = (v: number) => `${v.toFixed(v < 1 ? 3 : 2)}ms`;

export default function SidePanel(p: Props) {
  const c = paletteOf(useTheme());
  const legend = [
    { color: c.start, label: "시작점 (S)", round: true },
    { color: c.end, label: "도착점 (E)", round: true },
    { color: c.wall, label: "벽" },
    { color: c.weight, label: `지형 · 비용 ${WEIGHT_COST}` },
    { color: c.open, label: "탐색 대기" },
    {
      color: `linear-gradient(90deg, ${c.visited(0)}, ${c.visited(1)})`,
      label: "방문 (먼저 → 나중)",
    },
    {
      color: `linear-gradient(90deg, ${c.visitedEnd(0)}, ${c.visitedEnd(1)})`,
      label: "방문 · 도착 쪽 (양방향)",
    },
    { color: "transparent", border: c.current, label: "현재 탐색 노드" },
    { color: c.path, label: "최종 경로" },
  ];

  return (
    <Side>
      <Panel aria-label="지도 편집">
        <h3>지도 편집</h3>
        <Row role="radiogroup" aria-label="편집 도구">
          {TOOLS.map((t) => (
            <Button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={p.tool === t.id}
              $active={p.tool === t.id}
              onClick={() => p.onTool(t.id)}
            >
              {t.label}
            </Button>
          ))}
        </Row>
        <Muted>
          드래그로 칠하고, 같은 종류 칸에서 시작하면 지워져요. S·E는 끌어서 옮길
          수 있어요.
        </Muted>
        <Density>
          장애물 밀도 <b>{Math.round(p.density * 100)}%</b>
          <input
            type="range"
            min={5}
            max={45}
            value={Math.round(p.density * 100)}
            onChange={(e) => p.onDensity(Number(e.target.value) / 100)}
            disabled={p.locked}
          />
        </Density>
        <Row>
          <Button type="button" onClick={p.onRandom} disabled={p.locked}>
            랜덤 장애물
          </Button>
          <Button type="button" onClick={p.onMaze} disabled={p.locked}>
            미로 생성
          </Button>
          <Button type="button" onClick={p.onReset} disabled={p.locked}>
            전체 초기화
          </Button>
        </Row>
        <Row>
          <Button type="button" onClick={p.onSave} disabled={p.locked}>
            지도 저장
          </Button>
          <Button type="button" onClick={p.onLoad} disabled={p.locked}>
            불러오기
          </Button>
          <Muted role="status">{p.saveMessage}</Muted>
        </Row>
      </Panel>

      <Panel aria-label="알고리즘 비교">
        <Row style={{ justifyContent: "space-between" }}>
          <h3>성능 지표</h3>
          <Button type="button" onClick={p.onCompare} disabled={p.locked}>
            전체 비교
          </Button>
        </Row>
        <Table>
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">방문</th>
              <th scope="col">길이</th>
              <th scope="col">비용</th>
              <th scope="col">계산</th>
            </tr>
          </thead>
          <tbody>
            {(Object.keys(ALGORITHMS) as AlgorithmId[]).map((id) => {
              const m = p.metrics[id];
              return (
                <tr key={id}>
                  <th scope="row">{ALGORITHMS[id].label}</th>
                  {!m ? (
                    <td colSpan={4}>-</td>
                  ) : (
                    <>
                      <td>{m.visited}</td>
                      {m.reached ? (
                        <>
                          <td>{m.length}</td>
                          <td>{m.cost}</td>
                        </>
                      ) : (
                        <td colSpan={2}>도달 불가</td>
                      )}
                      <td>{ms(m.timeMs)}</td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Muted>
          길이: 이동 칸 수 · 비용: 지나간 칸 비용 합 · 계산: 애니메이션 없이
          알고리즘만 반복 실행한 평균 시간
          {p.animated && (
            <>
              <br />
              재생 시간 ({ALGORITHMS[p.animated.id].label}):{" "}
              {(p.animated.playMs / 1000).toFixed(1)}s
            </>
          )}
        </Muted>
      </Panel>

      <Panel aria-label="범례">
        <h3>범례</h3>
        <Legend>
          {legend.map((l) => (
            <li key={l.label}>
              <Swatch
                style={{ background: l.color, borderColor: l.border }}
                $round={l.round}
                $outline={!!l.border}
              />
              {l.label}
            </li>
          ))}
        </Legend>
      </Panel>
    </Side>
  );
}

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-width: 0;
`;
const Density = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  b {
    min-width: 3.6rem;
    color: ${({ theme }) => theme.colors.text};
    font-variant-numeric: tabular-nums;
  }
  input {
    flex: 1;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-variant-numeric: tabular-nums;
  th,
  td {
    padding: 0.6rem 0.4rem;
    text-align: right;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.border};
  }
  th[scope="row"] {
    text-align: left;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }
  thead th {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 400;
  }
`;
const Legend = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  li {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;
const Swatch = styled.span<{ $round?: boolean; $outline: boolean }>`
  flex-shrink: 0;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: ${({ $round }) => ($round ? "50%" : "0.3rem")};
  border: ${({ $outline }) =>
    $outline ? "0.25rem solid" : "0.1rem solid rgba(0, 0, 0, 0.15)"};
`;

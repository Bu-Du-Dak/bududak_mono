"use client";
import styled from "styled-components";
import { ALGORITHMS, type AlgorithmId, type Guarantee } from "./lib/search";
import type { Status } from "./usePlayback";
import { Button, Muted, Row } from "../common/styles";

type Props = {
  algorithm: AlgorithmId;
  onAlgorithm: (id: AlgorithmId) => void;
  status: Status;
  speedLevel: number;
  speed: number;
  onSpeedLevel: (v: number) => void;
  onMain: () => void;
  onStep: () => void;
  onClear: () => void;
  hasWeights: boolean;
};

const MAIN_LABEL: Record<Status, string> = { idle: "실행", running: "일시정지", paused: "재개", done: "다시 실행" };

const GUARANTEE: Record<Guarantee, string> = {
  steps: "칸 수 최단",
  cost: "최소 비용",
  none: "보장 없음",
};

export default function Toolbar(p: Props) {
  const selected = ALGORITHMS[p.algorithm];
  return (
    <Wrap>
      <Group>
        <Caption id="algorithm-label">알고리즘</Caption>
        <Options role="radiogroup" aria-labelledby="algorithm-label">
          {(Object.keys(ALGORITHMS) as AlgorithmId[]).map((id) => {
            const a = ALGORITHMS[id];
            const active = p.algorithm === id;
            return (
              <Option
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                $active={active}
                disabled={p.status === "running"}
                onClick={() => p.onAlgorithm(id)}
              >
                <strong>{a.label}</strong>
                <Tag $kind={a.guarantee}>{GUARANTEE[a.guarantee]}</Tag>
              </Option>
            );
          })}
        </Options>
        <Description>
          {selected.description}
          {!selected.weighted && p.hasWeights && (
            <Warn> 지금 지도엔 지형이 있는데, 이 알고리즘은 지형 비용을 고려하지 않아 최소 비용 경로가 아닐 수 있어요.</Warn>
          )}
        </Description>
      </Group>

      <Group>
        <Caption>실행</Caption>
        <Row>
          <Button type="button" $primary onClick={p.onMain}>
            {MAIN_LABEL[p.status]}
          </Button>
          <Button type="button" onClick={p.onStep} disabled={p.status === "running"}>
            한 단계
          </Button>
          <Button type="button" onClick={p.onClear} disabled={p.status === "idle"}>
            탐색 지우기
          </Button>
          <Speed>
            속도
            <input
              type="range"
              min={0}
              max={100}
              value={p.speedLevel}
              onChange={(e) => p.onSpeedLevel(Number(e.target.value))}
              aria-valuetext={`초당 ${p.speed}단계`}
            />
            <span>{p.speed}/s</span>
          </Speed>
        </Row>
      </Group>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const Caption = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.04em;
`;
const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10.4rem, 1fr));
  gap: 0.8rem;
`;
const Option = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  padding: 0.8rem 1.2rem;
  text-align: left;
  strong {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
`;
const TAG_COLOR: Record<Guarantee, string> = { steps: "#10B981", cost: "#3B82F6", none: "#9CA3AF" };
const Tag = styled.span<{ $kind: Guarantee }>`
  padding: 0.1rem 0.6rem;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 400;
  color: ${({ $kind }) => TAG_COLOR[$kind]};
  border: 0.1rem solid ${({ $kind }) => TAG_COLOR[$kind]};
`;
const Description = styled(Muted)`
  min-height: 3.6rem; /* 알고리즘 바꿀 때 아래 격자가 들썩이지 않게 */
`;
const Warn = styled.span`
  color: #f59e0b;
`;
const Speed = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  input {
    width: 12rem;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
  span {
    min-width: 5.6rem;
    font-variant-numeric: tabular-nums;
  }
`;

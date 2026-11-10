"use client";
import { useState } from "react";
import styled from "styled-components";
import { baseSize, type Size } from "./lib/geometry";
import { type Action, type Adjustments, DEFAULT_ADJUST, type EditParams } from "./lib/params";
import { Button, Muted, Panel, Row } from "../common/styles";

export const ASPECTS: { label: string; value: number | null }[] = [
  { label: "자유", value: null },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
];

const SLIDERS: { key: keyof Adjustments; label: string; min: number; max: number; step: number; unit: string }[] = [
  { key: "brightness", label: "밝기", min: 0, max: 200, step: 1, unit: "%" },
  { key: "contrast", label: "대비", min: 0, max: 200, step: 1, unit: "%" },
  { key: "saturate", label: "채도", min: 0, max: 200, step: 1, unit: "%" },
  { key: "grayscale", label: "흑백", min: 0, max: 100, step: 1, unit: "%" },
  { key: "blur", label: "블러", min: 0, max: 3, step: 0.1, unit: "" },
  { key: "pixelate", label: "픽셀화", min: 0, max: 10, step: 0.5, unit: "" },
];

type Props = {
  params: EditParams;
  dispatch: (a: Action) => void;
  src: Size;
  cropping: boolean;
  aspect: number | null;
  onAspect: (v: number | null) => void;
  onStartCrop: () => void;
  onApplyCrop: () => void;
  onCancelCrop: () => void;
};

export default function EditPanel(p: Props) {
  const { params, dispatch, src } = p;
  const base = baseSize(src, params);
  const out = params.resize ?? base;

  return (
    <Side>
      <Panel aria-label="변형">
        <h3>변형</h3>
        {p.cropping ? (
          <>
            <Row role="radiogroup" aria-label="크롭 비율">
              {ASPECTS.map((a) => (
                <Button
                  key={a.label}
                  type="button"
                  role="radio"
                  aria-checked={p.aspect === a.value}
                  $active={p.aspect === a.value}
                  onClick={() => p.onAspect(a.value)}
                >
                  {a.label}
                </Button>
              ))}
            </Row>
            <Muted>모서리를 끌어 크기를, 안쪽을 끌어 위치를 바꿔요. 바깥을 끌면 새로 그려요.</Muted>
            <Row>
              <Button type="button" $primary onClick={p.onApplyCrop}>
                크롭 적용
              </Button>
              <Button type="button" onClick={p.onCancelCrop}>
                취소
              </Button>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Button type="button" onClick={p.onStartCrop}>
                ✂️ 크롭
              </Button>
              {params.crop && (
                <Button type="button" onClick={() => dispatch({ type: "crop", crop: null })}>
                  크롭 해제
                </Button>
              )}
            </Row>
            <Row>
              <Button type="button" onClick={() => dispatch({ type: "rotate", dir: -1 })} aria-label="왼쪽으로 90도 회전">
                ⟲ 90°
              </Button>
              <Button type="button" onClick={() => dispatch({ type: "rotate", dir: 1 })} aria-label="오른쪽으로 90도 회전">
                ⟳ 90°
              </Button>
              <Button type="button" $active={params.flipX} aria-pressed={params.flipX} onClick={() => dispatch({ type: "flip", axis: "x" })}>
                ⇆ 좌우
              </Button>
              <Button type="button" $active={params.flipY} aria-pressed={params.flipY} onClick={() => dispatch({ type: "flip", axis: "y" })}>
                ⇅ 상하
              </Button>
            </Row>
          </>
        )}
      </Panel>

      <Panel aria-label="크기">
        <h3>크기</h3>
        <Row>
          <SizeField label="가로" value={out.width} disabled={p.cropping} onCommit={(width) => dispatch({ type: "resize", by: { width }, src })} />
          <span aria-hidden>×</span>
          <SizeField label="세로" value={out.height} disabled={p.cropping} onCommit={(height) => dispatch({ type: "resize", by: { height }, src })} />
          <span>px</span>
        </Row>
        <Row>
          <Check>
            <input
              type="checkbox"
              checked={params.keepRatio}
              onChange={(e) => dispatch({ type: "keepRatio", value: e.target.checked, src })}
            />
            비율 유지
          </Check>
          {params.resize && (
            <Button type="button" onClick={() => dispatch({ type: "resetResize" })}>
              원래 크기 ({base.width}×{base.height})
            </Button>
          )}
        </Row>
      </Panel>

      <Panel aria-label="보정과 효과">
        <h3>보정 · 효과</h3>
        {SLIDERS.map((s) => {
          const value = params[s.key];
          const changed = value !== DEFAULT_ADJUST[s.key];
          return (
            <Slider key={s.key}>
              <span>{s.label}</span>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={value}
                onChange={(e) => dispatch({ type: "adjust", key: s.key, value: Number(e.target.value) })}
                onDoubleClick={() => dispatch({ type: "adjust", key: s.key, value: DEFAULT_ADJUST[s.key] })}
                aria-label={s.label}
              />
              <Value $changed={changed}>
                {value}
                {s.unit}
              </Value>
            </Slider>
          );
        })}
        <Muted>블러·픽셀화 값은 이미지 짧은 변 대비 % 예요. 슬라이더를 더블클릭하면 기본값으로 돌아가요.</Muted>
        <Button type="button" onClick={() => dispatch({ type: "reset" })}>
          전체 초기화
        </Button>
      </Panel>
    </Side>
  );
}

function SizeField({ label, value, disabled, onCommit }: { label: string; value: number; disabled: boolean; onCommit: (v: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    const n = Number(draft);
    if (draft !== null && Number.isFinite(n) && n >= 1 && n !== value) onCommit(n);
    setDraft(null);
  };
  return (
    <NumberInput
      type="number"
      inputMode="numeric"
      min={1}
      value={draft ?? value}
      disabled={disabled}
      aria-label={`${label} (px)`}
      onFocus={() => setDraft(String(value))}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
    />
  );
}

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-width: 0;
`;
const NumberInput = styled.input`
  width: 8rem;
  padding: 0.6rem 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  font-variant-numeric: tabular-nums;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &:disabled {
    opacity: 0.5;
  }
`;
const Check = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  cursor: pointer;
  input {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;
const Slider = styled.label`
  display: grid;
  grid-template-columns: 4.8rem 1fr 4.8rem;
  align-items: center;
  gap: 0.8rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  input {
    width: 100%;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;
const Value = styled.span<{ $changed: boolean }>`
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: ${({ theme, $changed }) => ($changed ? theme.colors.primary : theme.colors.textSecondary)};
`;

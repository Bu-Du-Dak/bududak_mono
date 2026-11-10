"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import type { Menu } from "./DinnerRoulette";
import {
  MAX_MENUS,
  MAX_PERCENT,
  MIN_PERCENT,
  setPercent,
  toPercent,
} from "./spin";

type Props = {
  menus: Menu[];
  disabled: boolean;
  onChange: (menus: Menu[]) => void;
};

const format = (n: number) => String(Math.round(n * 10) / 10);

export default function MenuEditor({ menus, disabled, onChange }: Props) {
  const [draft, setDraft] = useState("");
  const full = menus.length >= MAX_MENUS;
  const weights = menus.map((m) => m.weight);
  const isEqual = weights.every((w) => Math.abs(w - weights[0]!) < 1e-9);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const name = draft.trim();
    if (!name || full) return;
    const weight = weights.reduce((a, b) => a + b, 0) / weights.length;
    onChange([...menus, { id: crypto.randomUUID(), name, weight }]);
    setDraft("");
  };

  const changePercent = (i: number, percent: number) => {
    const next = setPercent(weights, i, percent);
    onChange(menus.map((m, j) => ({ ...m, weight: next[j]! })));
  };

  return (
    <Panel aria-label="메뉴 편집">
      <Header>
        <h3>메뉴 목록</h3>
        <HeaderRight>
          <TextButton
            type="button"
            onClick={() => onChange(menus.map((m) => ({ ...m, weight: 1 })))}
            disabled={disabled || isEqual}
          >
            균등 분배
          </TextButton>
          <Count $full={full}>
            {menus.length} / {MAX_MENUS}
          </Count>
        </HeaderRight>
      </Header>

      <AddForm onSubmit={add}>
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={full ? "최대 개수에 도달했어요" : "새 메뉴 이름"}
          maxLength={20}
          disabled={disabled || full}
          aria-label="새 메뉴 이름"
        />
        <AddButton type="submit" disabled={disabled || full || !draft.trim()}>
          추가
        </AddButton>
      </AddForm>

      <List>
        {menus.map((menu, i) => (
          <Row key={menu.id}>
            <Swatch
              style={{ background: `hsl(${(i * 360) / menus.length} 70% 72%)` }}
            />
            <Input
              value={menu.name}
              onChange={(e) =>
                onChange(
                  menus.map((m) =>
                    m.id === menu.id ? { ...m, name: e.target.value } : m,
                  ),
                )
              }
              maxLength={20}
              disabled={disabled}
              aria-label={`${i + 1}번 메뉴 이름`}
              aria-invalid={!menu.name.trim()}
            />
            <PercentInput
              value={toPercent(weights, i)}
              onCommit={(p) => changePercent(i, p)}
              disabled={disabled || menus.length <= 1}
              label={`${menu.name || `${i + 1}번 메뉴`} 비율(%)`}
            />
            <IconButton
              type="button"
              onClick={() => onChange(menus.filter((m) => m.id !== menu.id))}
              disabled={disabled || menus.length <= 1}
              aria-label={`${menu.name || `${i + 1}번 메뉴`} 삭제`}
            >
              <span aria-hidden>✕</span>
            </IconButton>
          </Row>
        ))}
      </List>
    </Panel>
  );
}

type PercentInputProps = {
  value: number;
  onCommit: (percent: number) => void;
  disabled: boolean;
  label: string;
};

const stepPercent = (value: number, dir: 1 | -1) => {
  const v = Math.round(value * 10) / 10;
  return dir === 1 ? Math.floor(v) + 1 : Math.ceil(v) - 1;
};

function useHoldStep(value: number, onCommit: (p: number) => void) {
  const latest = useRef({ value, onCommit });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    latest.current = { value, onCommit };
  });

  const stop = () => clearTimeout(timer.current);
  useEffect(() => stop, []);

  const step = (dir: 1 | -1) => {
    const { value, onCommit } = latest.current;
    onCommit(stepPercent(value, dir));
  };

  return (dir: 1 | -1) => ({
    onPointerDown: (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      step(dir);
      const repeat = (delay: number) => {
        timer.current = setTimeout(() => {
          step(dir);
          repeat(60);
        }, delay);
      };
      repeat(400);
      window.addEventListener("pointerup", stop, { once: true });
      window.addEventListener("pointercancel", stop, { once: true });
    },
    onPointerLeave: stop,
    onClick: (e: React.MouseEvent) => {
      if (e.detail === 0) step(dir);
    },
  });
}

function PercentInput({ value, onCommit, disabled, label }: PercentInputProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const hold = useHoldStep(value, onCommit);
  return (
    <Stepper $disabled={disabled}>
      <StepButton
        type="button"
        {...hold(-1)}
        disabled={disabled || value <= MIN_PERCENT}
        aria-label={`${label} 1% 줄이기`}
      >
        −
      </StepButton>
      <NumberInput
        type="number"
        inputMode="decimal"
        min={MIN_PERCENT}
        max={MAX_PERCENT}
        step={1}
        value={draft ?? format(value)}
        onFocus={() => setDraft(format(value))}
        onChange={(e) => {
          setDraft(e.target.value);
          const n = parseFloat(e.target.value);
          if (Number.isFinite(n) && n > 0) onCommit(n);
        }}
        onBlur={() => setDraft(null)}
        disabled={disabled}
        aria-label={label}
      />
      <Unit aria-hidden>%</Unit>
      <StepButton
        type="button"
        {...hold(1)}
        disabled={disabled || value >= MAX_PERCENT}
        aria-label={`${label} 1% 늘리기`}
      >
        +
      </StepButton>
    </Stepper>
  );
}

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-width: 0;
  padding: 2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
const TextButton = styled.button`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:disabled {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.5;
    cursor: default;
  }
`;
const Stepper = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 3.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: border-color 0.15s ease;
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
const StepButton = styled.button`
  display: grid;
  place-items: center;
  width: 2.8rem;
  height: 100%;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.border}66;
  }
  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: -0.2rem;
  }
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;
const Unit = styled.span`
  padding-right: 0.2rem;
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
const NumberInput = styled.input`
  width: 3.6rem;
  height: 100%;
  text-align: right;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-variant-numeric: tabular-nums;
  &:focus {
    outline: none;
  }
  /* 브라우저 기본 스피너 숨기기 */
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const Count = styled.span<{ $full: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme, $full }) =>
    $full ? theme.colors.primary : theme.colors.textSecondary};
`;
const AddForm = styled.form`
  display: flex;
  gap: 0.8rem;
`;
const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &[aria-invalid="true"] {
    border-color: #ef4444;
  }
  &:disabled {
    opacity: 0.5;
  }
`;
const AddButton = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-height: 48rem;
  overflow-y: auto;
`;
const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
const Swatch = styled.span`
  flex-shrink: 0;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
`;
const IconButton = styled.button`
  display: grid;
  place-items: center;
  width: 3.2rem;
  height: 3.2rem;
  flex-shrink: 0;
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  &:hover:not(:disabled) {
    color: #ef4444;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

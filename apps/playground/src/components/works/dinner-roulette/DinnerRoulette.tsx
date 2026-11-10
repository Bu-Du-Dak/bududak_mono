"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Wheel from "./Wheel";
import MenuEditor from "./MenuEditor";
import Result, { createParticles, type Particle } from "./Result";
import { MAX_MENUS, getSpinRotation, indexAtTop, pickWeighted } from "./spin";
import { media } from "../../../../../../packages/ui/src/styles/breakPoints";

export type Menu = { id: string; name: string; weight: number };

const DEFAULT_MENUS: Menu[] = ["한식", "중식", "일식", "양식"].map((name) => ({
  id: name,
  name,
  weight: 1,
}));

const STORAGE_KEY = "playground:dinner-roulette:menus";

function loadMenus(): Menu[] | null {
  try {
    const data: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "null",
    );
    const valid =
      Array.isArray(data) &&
      data.length >= 1 &&
      data.length <= MAX_MENUS &&
      data.every(
        (m) =>
          typeof m?.id === "string" &&
          typeof m?.name === "string" &&
          m.name.length <= 20 &&
          typeof m?.weight === "number" &&
          Number.isFinite(m.weight) &&
          m.weight > 0,
      );
    return valid ? (data as Menu[]) : null;
  } catch {
    return null;
  }
}

type Phase =
  | { type: "idle" }
  | { type: "spinning" }
  | { type: "result"; name: string; particles: Particle[] };

export default function DinnerRoulette() {
  const [menus, setMenus] = useState(DEFAULT_MENUS);
  const [rotation, setRotation] = useState(0);
  const [phase, setPhase] = useState<Phase>({ type: "idle" });

  useEffect(() => {
    const saved = loadMenus();
    if (saved) setMenus(saved);
  }, []);

  const updateMenus = (next: Menu[]) => {
    setMenus(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const hasEmpty = menus.some((m) => !m.name.trim());
  const canSpin = phase.type === "idle" && !hasEmpty;

  const spin = () => {
    if (!canSpin) return;
    const weights = menus.map((m) => m.weight);
    const winner = pickWeighted(weights, Math.random());

    setRotation(getSpinRotation(weights, winner, 0.15 + Math.random() * 0.7));
    setPhase({ type: "spinning" });
  };

  const handleSpinEnd = () => {
    if (phase.type !== "spinning") return;
    const menu =
      menus[
        indexAtTop(
          rotation,
          menus.map((m) => m.weight),
        )
      ]!;
    setPhase({
      type: "result",
      name: menu.name.trim(),
      particles: createParticles(),
    });
  };

  const reset = () => {
    setRotation(0);
    setPhase({ type: "idle" });
  };

  return (
    <Layout>
      <WheelArea>
        <Pointer aria-hidden />
        <Wheel
          menus={menus}
          rotation={rotation}
          spinning={phase.type === "spinning"}
          onSpinEnd={handleSpinEnd}
        />
        <SpinButton type="button" onClick={spin} disabled={!canSpin}>
          {phase.type === "spinning" ? "두구두구" : "돌리기"}
        </SpinButton>
        {phase.type === "result" && (
          <Result
            name={phase.name}
            particles={phase.particles}
            onConfirm={reset}
          />
        )}
        {hasEmpty && (
          <Hint role="alert">비어 있는 메뉴 이름을 채워주세요.</Hint>
        )}
      </WheelArea>

      <MenuEditor
        menus={menus}
        disabled={phase.type !== "idle"}
        onChange={updateMenus}
      />
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 38rem;
  gap: 4rem;
  align-items: start;

  ${media.lt("web")} {
    grid-template-columns: 1fr;
  }
`;
const WheelArea = styled.div`
  position: relative;
  width: min(100%, 52rem);
  aspect-ratio: 1;
  margin: 2rem auto 0;
`;
const Pointer = styled.div`
  position: absolute;
  top: -1.6rem;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 1.4rem solid transparent;
  border-right: 1.4rem solid transparent;
  border-top: 3.2rem solid ${({ theme }) => theme.colors.primary};
  filter: drop-shadow(0 0.2rem 0.3rem rgba(0, 0, 0, 0.35));
`;
const SpinButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  border: 0.4rem solid #fff;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover:not(:disabled) {
    transform: translate(-50%, -50%) scale(1.06);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.85;
  }
`;
const Hint = styled.p`
  position: absolute;
  bottom: -3.6rem;
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: #ef4444;
`;

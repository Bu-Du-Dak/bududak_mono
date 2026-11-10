"use client";
import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

export type Particle = {
  x: number;
  y: number;
  r: number;
  color: string;
  delay: number;
};

const COLORS = [
  "#FF6B6B",
  "#FFD93D",
  "#6BCB77",
  "#4D96FF",
  "#C77DFF",
  "#FF9F45",
];

export function createParticles(count = 48): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 8 + Math.random() * 14;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      r: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length]!,
      delay: Math.random() * 0.15,
    };
  });
}

type Props = { name: string; particles: Particle[]; onConfirm: () => void };

export default function Result({ name, particles, onConfirm }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => buttonRef.current?.focus(), []);

  return (
    <Overlay role="dialog" aria-modal="true" aria-labelledby="roulette-result">
      {particles.map((p, i) => (
        <Confetti
          key={i}
          aria-hidden
          style={
            {
              "--x": `${p.x}rem`,
              "--y": `${p.y}rem`,
              "--r": `${p.r}deg`,
              background: p.color,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
      <Card>
        <Label>오늘 저녁은</Label>
        <Name id="roulette-result">{name}!</Name>
        <Confirm ref={buttonRef} type="button" onClick={onConfirm}>
          확인
        </Confirm>
      </Card>
    </Overlay>
  );
}

const burst = keyframes`
  0% { transform: translate(0, 0) rotate(0); opacity: 1; }
  100% { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 0; }
`;
const pop = keyframes`
  0% { transform: scale(0.4); opacity: 0; }
  70% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 2;
`;
const Confetti = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.8rem;
  height: 1.4rem;
  border-radius: 0.2rem;
  opacity: 0;
  animation: ${burst} 1.4s ease-out forwards;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  min-width: 22rem;
  max-width: 90%;
  padding: 2.4rem 3.2rem;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.bg};
  border: 0.1rem solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 1.2rem 4rem rgba(0, 0, 0, 0.35);
  animation: ${pop} 0.45s ease-out;
`;
const Label = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
const Name = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes["3xl"]};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-align: center;
  word-break: keep-all;
`;
const Confirm = styled.button`
  margin-top: 0.8rem;
  padding: 0.8rem 2.4rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

"use client";
import styled from "styled-components";
import type { Menu } from "./DinnerRoulette";
import { sliceAngles } from "./spin";

const R = 200;

type Props = {
  menus: Menu[];
  rotation: number;
  spinning: boolean;
  onSpinEnd: () => void;
};

const point = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return `${r * Math.sin(rad)} ${-r * Math.cos(rad)}`;
};

const truncate = (name: string, max: number) =>
  name.length > max ? `${name.slice(0, max)}…` : name;

export default function Wheel({ menus, rotation, spinning, onSpinEnd }: Props) {
  const count = menus.length;
  const slices = sliceAngles(menus.map((m) => m.weight));

  return (
    <Svg
      viewBox={`${-R} ${-R} ${R * 2} ${R * 2}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      $spinning={spinning}
      onTransitionEnd={onSpinEnd}
      role="img"
      aria-label={`메뉴 ${count}개가 있는 룰렛`}
    >
      {menus.map((menu, i) => {
        const { start, end } = slices[i]!;
        const slice = end - start;
        const mid = start + slice / 2;
        const fill = `hsl(${(i * 360) / count} 70% 72%)`;
        const radial = slice < 45;
        const fontSize = radial
          ? Math.min(16, ((2 * Math.PI * R * 0.6 * slice) / 360) * 0.7)
          : 18;
        return (
          <g key={menu.id}>
            {count === 1 ? (
              <circle r={R} fill={fill} />
            ) : (
              <path
                d={`M0 0 L${point(start, R)} A${R} ${R} 0 ${slice > 180 ? 1 : 0} 1 ${point(end, R)} Z`}
                fill={fill}
                stroke="#fff"
                strokeWidth={count > 30 ? 0.5 : 1.5}
              />
            )}
            {fontSize >= 5 && (
              <text
                transform={
                  radial
                    ? `rotate(${mid - 90}) translate(${R * 0.62} 0)`
                    : `rotate(${mid}) translate(0 ${-R * 0.62})`
                }
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={fontSize}
                fontWeight={700}
                fill="#1c1c1c"
              >
                {truncate(menu.name || "?", radial ? 8 : 6)}
              </text>
            )}
          </g>
        );
      })}
    </Svg>
  );
}

const Svg = styled.svg<{ $spinning: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 0 0.6rem ${({ theme }) => theme.colors.border};
  transition: ${({ $spinning }) =>
    $spinning ? "transform 5s cubic-bezier(0.15, 0.7, 0.1, 1)" : "none"};

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ $spinning }) => ($spinning ? "0.6s" : "0s")};
  }
`;

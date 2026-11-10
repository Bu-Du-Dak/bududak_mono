import type { ComponentType } from "react";
import ComingSoon from "../components/works/ComingSoon";
import DinnerRoulette from "../components/works/dinner-roulette/DinnerRoulette";
import PathFinding from "../components/works/path-finding/PathFinding";

export type Work = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  Component: ComponentType;
};

export const WORKS: Work[] = [
  {
    id: "dinner-roulette",
    emoji: "🍽️",
    title: "fffff",
    description: "aaasdasd",
    tags: ["SVG", "Animation"],
    Component: DinnerRoulette,
  },
  {
    id: "football-pinball",
    emoji: "⚽",
    title: "ddddd",
    description: "aaaa",
    tags: ["Physics", "Game"],
    Component: ComingSoon,
  },
  {
    id: "path-finding",
    emoji: "🧭",
    title: "경로 탐색 시각화",
    description: "BFS · Dijkstra · A* 가 지도를 탐색하는 과정을 단계별로 비교해요.",
    tags: ["Canvas", "Algorithm"],
    Component: PathFinding,
  },
];

export const getWork = (id: string) => WORKS.find((work) => work.id === id);

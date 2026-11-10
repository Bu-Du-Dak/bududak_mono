import type { ComponentType } from "react";
import ComingSoon from "../components/works/ComingSoon";
import DinnerRoulette from "../components/works/dinner-roulette/DinnerRoulette";
import PathFinding from "../components/works/path-finding/PathFinding";
import ImageStudio from "../components/works/image-studio/ImageStudio";

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
    title: "메뉴 추천 룰렛",
    description: "뭘 먹어야하는지 고민될 때",
    tags: ["SVG", "Animation"],
    Component: DinnerRoulette,
  },
  {
    id: "path-finding",
    emoji: "🧭",
    title: "경로 탐색 시각화",
    description:
      "BFS · Dijkstra · A* 가 지도를 탐색하는 과정을 단계별로 비교해요",
    tags: ["Canvas", "Algorithm"],
    Component: PathFinding,
  },
  {
    id: "image-studio",
    emoji: "🖼️",
    title: "이미지 처리 스튜디오",
    description:
      "브라우저 안에서 이미지를 자르고 보정하고 변환해요 서버로 전송하지 않아요",
    tags: ["Canvas", "Web Worker"],
    Component: ImageStudio,
  },
];

export const getWork = (id: string) => WORKS.find((work) => work.id === id);

import type { ComponentType } from "react";
import ComingSoon from "../components/works/ComingSoon";

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
    tags: ["Canvas", "Animation"],
    Component: ComingSoon,
  },
  {
    id: "football-pinball",
    emoji: "⚽",
    title: "ddddd",
    description: "aaaa",
    tags: ["Physics", "Game"],
    Component: ComingSoon,
  },
];

export const getWork = (id: string) => WORKS.find((work) => work.id === id);

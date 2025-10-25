export const breakpoints = {
  mobile: 0,
  tablet: 768,
  web: 1024,
} as const;

type Keys = keyof typeof breakpoints;

export const media = {
  lt: (key: Keys) => `@media (max-width: ${breakpoints[key] - 1}px)`,
  gte: (key: Keys) => `@media (min-width: ${breakpoints[key]}px)`,
  between: (a: Keys, b: Keys) =>
    `@media (min-width: ${breakpoints[a]}px) and (max-width: ${breakpoints[b] - 1}px)`,
};

export const MAX_MENUS = 60;
export const SPIN_TURNS = 6;
export const MIN_PERCENT = 1;
export const MAX_PERCENT = 99;

const total = (weights: number[]) => weights.reduce((a, b) => a + b, 0);

export function sliceAngles(weights: number[]) {
  const sum = total(weights);
  let acc = 0;
  return weights.map((w) => {
    const start = (acc / sum) * 360;
    acc += w;
    return { start, end: (acc / sum) * 360 };
  });
}

export const toPercent = (weights: number[], i: number) =>
  (weights[i]! / total(weights)) * 100;

export function pickWeighted(weights: number[], r: number) {
  let x = r * total(weights);
  for (let i = 0; i < weights.length; i++) {
    x -= weights[i]!;
    if (x < 0) return i;
  }
  return weights.length - 1;
}

export function getSpinRotation(
  weights: number[],
  winner: number,
  offset: number,
) {
  const { start, end } = sliceAngles(weights)[winner]!;
  return SPIN_TURNS * 360 + (360 - (start + offset * (end - start)));
}

export function indexAtTop(rotation: number, weights: number[]) {
  const angle = (((360 - rotation) % 360) + 360) % 360;
  const i = sliceAngles(weights).findIndex((s) => angle < s.end);
  return i === -1 ? weights.length - 1 : i;
}

export function setPercent(weights: number[], i: number, percent: number) {
  const others = total(weights) - weights[i]!;
  if (others <= 0) return weights;
  const p = Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, percent));
  return weights.map((w, j) => (j === i ? (p / (100 - p)) * others : w));
}

import { baseSize, type Crop, ratioSize, type Rotation, type Size } from "./geometry";
import { capPixels } from "./validate";

export type Adjustments = {
  brightness: number;
  contrast: number;
  saturate: number;
  grayscale: number;
  blur: number;
  pixelate: number;
};

export type EditParams = Adjustments & {
  crop: Crop | null;
  rotate: Rotation;
  flipX: boolean;
  flipY: boolean;
  resize: Size | null;
  keepRatio: boolean;
};

export const DEFAULT_ADJUST: Adjustments = { brightness: 100, contrast: 100, saturate: 100, grayscale: 0, blur: 0, pixelate: 0 };
export const DEFAULT_PARAMS: EditParams = {
  ...DEFAULT_ADJUST,
  crop: null,
  rotate: 0,
  flipX: false,
  flipY: false,
  resize: null,
  keepRatio: true,
};

export const hasFilters = (p: Adjustments) =>
  (Object.keys(DEFAULT_ADJUST) as (keyof Adjustments)[]).some((k) => p[k] !== DEFAULT_ADJUST[k]);

export type Action =
  | { type: "adjust"; key: keyof Adjustments; value: number }
  | { type: "rotate"; dir: 1 | -1 }
  | { type: "flip"; axis: "x" | "y" }
  | { type: "crop"; crop: Crop | null }
  | { type: "resize"; by: { width: number } | { height: number }; src: Size }
  | { type: "keepRatio"; value: boolean; src: Size }
  | { type: "resetResize" }
  | { type: "reset" };

const sane = (s: Size): Size =>
  capPixels({ width: Math.max(1, Math.round(s.width)), height: Math.max(1, Math.round(s.height)) });

export function reducer(p: EditParams, a: Action): EditParams {
  switch (a.type) {
    case "adjust":
      return { ...p, [a.key]: a.value };
    case "rotate":
      return {
        ...p,
        rotate: (((p.rotate + a.dir * 90) % 360) + 360) % 360 as Rotation,
        resize: p.resize && { width: p.resize.height, height: p.resize.width },
      };
    case "flip":
      return a.axis === "x" ? { ...p, flipX: !p.flipX } : { ...p, flipY: !p.flipY };
    case "crop":
      return { ...p, crop: a.crop, resize: null };
    case "resize": {
      const base = baseSize(a.src, p);
      const current = p.resize ?? base;
      const next = p.keepRatio
        ? ratioSize(base, a.by)
        : { ...current, ...a.by };
      return { ...p, resize: sane(next) };
    }
    case "keepRatio": {
      const base = baseSize(a.src, p);
      const resize = a.value && p.resize ? sane(ratioSize(base, { width: p.resize.width })) : p.resize;
      return { ...p, keepRatio: a.value, resize };
    }
    case "resetResize":
      return { ...p, resize: null };
    case "reset":
      return DEFAULT_PARAMS;
  }
}

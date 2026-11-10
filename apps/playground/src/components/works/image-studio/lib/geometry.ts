export type Size = { width: number; height: number };
export type Crop = { x: number; y: number; w: number; h: number };
export type Rotation = 0 | 90 | 180 | 270;
type Orientation = { rotate: Rotation; flipX: boolean; flipY: boolean };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function cropRect(src: Size, crop: Crop | null) {
  if (!crop) return { x: 0, y: 0, width: src.width, height: src.height };
  const x = clamp(Math.round(crop.x * src.width), 0, src.width - 1);
  const y = clamp(Math.round(crop.y * src.height), 0, src.height - 1);
  return {
    x,
    y,
    width: clamp(Math.round(crop.w * src.width), 1, src.width - x),
    height: clamp(Math.round(crop.h * src.height), 1, src.height - y),
  };
}

export function baseSize(src: Size, p: { crop: Crop | null; rotate: Rotation }): Size {
  const r = cropRect(src, p.crop);
  return p.rotate % 180 ? { width: r.height, height: r.width } : { width: r.width, height: r.height };
}

export const outputSize = (src: Size, p: { crop: Crop | null; rotate: Rotation; resize: Size | null }) =>
  p.resize ?? baseSize(src, p);

export function fitSize(size: Size, max: Size): Size {
  const scale = Math.min(1, max.width / size.width, max.height / size.height);
  return { width: Math.max(1, Math.round(size.width * scale)), height: Math.max(1, Math.round(size.height * scale)) };
}

export function ratioSize(base: Size, by: { width: number } | { height: number }): Size {
  if ("width" in by) return { width: by.width, height: Math.max(1, Math.round((by.width * base.height) / base.width)) };
  return { width: Math.max(1, Math.round((by.height * base.width) / base.height)), height: by.height };
}

type Point = [number, number];
export function toDisplay([x, y]: Point, o: Orientation): Point {
  let [u, v]: Point = o.rotate === 90 ? [1 - y, x] : o.rotate === 180 ? [1 - x, 1 - y] : o.rotate === 270 ? [y, 1 - x] : [x, y];
  if (o.flipX) u = 1 - u;
  if (o.flipY) v = 1 - v;
  return [u, v];
}

export function fromDisplay([u, v]: Point, o: Orientation): Point {
  if (o.flipX) u = 1 - u;
  if (o.flipY) v = 1 - v;
  return o.rotate === 90 ? [v, 1 - u] : o.rotate === 180 ? [1 - u, 1 - v] : o.rotate === 270 ? [1 - v, u] : [u, v];
}

const mapRect = (r: Crop, f: (p: Point) => Point): Crop => {
  const [x1, y1] = f([r.x, r.y]);
  const [x2, y2] = f([r.x + r.w, r.y + r.h]);
  return { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1) };
};

export const cropToDisplay = (crop: Crop, o: Orientation) => mapRect(crop, (p) => toDisplay(p, o));
export const displayToCrop = (rect: Crop, o: Orientation) => mapRect(rect, (p) => fromDisplay(p, o));


const MIN_CROP = 0.02;

const normRatio = (aspect: number, size: Size) => (aspect * size.height) / size.width;

export function aspectRect(aspect: number | null, size: Size): Crop {
  if (!aspect) return { x: 0, y: 0, w: 1, h: 1 };
  const rn = normRatio(aspect, size);
  const [w, h] = rn >= 1 ? [1, 1 / rn] : [rn, 1];
  return { x: (1 - w) / 2, y: (1 - h) / 2, w, h };
}

export function dragCorner(anchor: Point, point: Point, aspect: number | null, size: Size): Crop {
  const [ax, ay] = anchor;
  const sx = point[0] >= ax ? 1 : -1;
  const sy = point[1] >= ay ? 1 : -1;
  const maxW = sx > 0 ? 1 - ax : ax;
  const maxH = sy > 0 ? 1 - ay : ay;
  let w = Math.min(Math.abs(point[0] - ax), maxW);
  let h = Math.min(Math.abs(point[1] - ay), maxH);
  if (aspect) {
    const rn = normRatio(aspect, size);
    if (h === 0 || w / h > rn) w = h * rn;
    else h = w / rn;
  }
  w = Math.min(Math.max(w, MIN_CROP), maxW);
  h = Math.min(Math.max(h, MIN_CROP), maxH);
  return { x: sx > 0 ? ax : ax - w, y: sy > 0 ? ay : ay - h, w, h };
}

export const moveRect = (r: Crop, dx: number, dy: number): Crop => ({
  ...r,
  x: clamp(r.x + dx, 0, 1 - r.w),
  y: clamp(r.y + dy, 0, 1 - r.h),
});

export const isFull = (r: Crop) => r.x < 0.001 && r.y < 0.001 && r.w > 0.999 && r.h > 0.999;

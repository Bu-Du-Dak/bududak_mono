import type { Adjustments } from "./params";

export type Pixels = { data: Uint8ClampedArray; width: number; height: number };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function adjustColors(img: Pixels, a: Pick<Adjustments, "brightness" | "contrast" | "saturate" | "grayscale">) {
  const b = a.brightness / 100;
  const k = a.contrast / 100;
  const s = (a.saturate / 100) * (1 - a.grayscale / 100);
  if (b === 1 && k === 1 && s === 1) return;

  const lut = new Float32Array(256);
  for (let i = 0; i < 256; i++) lut[i] = clamp01((clamp01((i / 255) * b) - 0.5) * k + 0.5) * 255;

  const m = [
    0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s,
    0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s,
    0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s,
  ] as const;
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = lut[d[i]!]!;
    const g = lut[d[i + 1]!]!;
    const bl = lut[d[i + 2]!]!;
    if (s === 1) {
      d[i] = r;
      d[i + 1] = g;
      d[i + 2] = bl;
    } else {
      d[i] = m[0] * r + m[1] * g + m[2] * bl;
      d[i + 1] = m[3] * r + m[4] * g + m[5] * bl;
      d[i + 2] = m[6] * r + m[7] * g + m[8] * bl;
    }
  }
}

function boxH(src: Float32Array, dst: Float32Array, w: number, h: number, r: number) {
  const size = r * 2 + 1;
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let sum = src[row]! * (r + 1);
    for (let k = 1; k <= r; k++) sum += src[row + Math.min(k, w - 1)]!;
    for (let x = 0; x < w; x++) {
      dst[row + x] = sum / size;
      sum += src[row + Math.min(x + r + 1, w - 1)]! - src[row + Math.max(x - r, 0)]!;
    }
  }
}

function boxV(src: Float32Array, dst: Float32Array, w: number, h: number, r: number) {
  const size = r * 2 + 1;
  for (let x = 0; x < w; x++) {
    let sum = src[x]! * (r + 1);
    for (let k = 1; k <= r; k++) sum += src[Math.min(k, h - 1) * w + x]!;
    for (let y = 0; y < h; y++) {
      dst[y * w + x] = sum / size;
      sum += src[Math.min(y + r + 1, h - 1) * w + x]! - src[Math.max(y - r, 0) * w + x]!;
    }
  }
}

export function blur(img: Pixels, radius: number) {
  const r = Math.round(radius);
  if (r < 1) return;
  const { data: d, width: w, height: h } = img;
  const n = w * h;
  const ch = [new Float32Array(n), new Float32Array(n), new Float32Array(n), new Float32Array(n)];
  for (let p = 0; p < n; p++) {
    const a = d[p * 4 + 3]!;
    ch[0]![p] = (d[p * 4]! * a) / 255;
    ch[1]![p] = (d[p * 4 + 1]! * a) / 255;
    ch[2]![p] = (d[p * 4 + 2]! * a) / 255;
    ch[3]![p] = a;
  }
  const tmp = new Float32Array(n);
  for (const c of ch) {
    for (let pass = 0; pass < 3; pass++) {
      boxH(c, tmp, w, h, r);
      boxV(tmp, c, w, h, r);
    }
  }
  for (let p = 0; p < n; p++) {
    const a = ch[3]![p]!;
    d[p * 4 + 3] = a;
    if (a > 0) {
      d[p * 4] = (ch[0]![p]! * 255) / a;
      d[p * 4 + 1] = (ch[1]![p]! * 255) / a;
      d[p * 4 + 2] = (ch[2]![p]! * 255) / a;
    }
  }
}

export function pixelate(img: Pixels, block: number) {
  const s = Math.round(block);
  if (s < 2) return;
  const { data: d, width: w, height: h } = img;
  for (let by = 0; by < h; by += s) {
    for (let bx = 0; bx < w; bx += s) {
      const ex = Math.min(bx + s, w);
      const ey = Math.min(by + s, h);
      let r = 0, g = 0, b = 0, a = 0;
      for (let y = by; y < ey; y++)
        for (let x = bx; x < ex; x++) {
          const i = (y * w + x) * 4;
          const al = d[i + 3]!;
          r += d[i]! * al;
          g += d[i + 1]! * al;
          b += d[i + 2]! * al;
          a += al;
        }
      const count = (ex - bx) * (ey - by);
      const color = a > 0 ? [r / a, g / a, b / a] : [0, 0, 0];
      for (let y = by; y < ey; y++)
        for (let x = bx; x < ex; x++) {
          const i = (y * w + x) * 4;
          d[i] = color[0]!;
          d[i + 1] = color[1]!;
          d[i + 2] = color[2]!;
          d[i + 3] = a / count;
        }
    }
  }
}

export const effectPx = (percent: number, size: { width: number; height: number }) =>
  Math.round((percent / 100) * Math.min(size.width, size.height));

export function applyFilters(img: Pixels, a: Adjustments) {
  adjustColors(img, a);
  if (a.blur > 0) blur(img, Math.max(1, effectPx(a.blur, img)));
  if (a.pixelate > 0) pixelate(img, Math.max(2, effectPx(a.pixelate, img)));
}

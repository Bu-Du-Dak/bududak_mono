import { applyFilters } from "./lib/filters";
import { cropRect, fitSize, outputSize, type Size } from "./lib/geometry";
import { type EditParams, hasFilters } from "./lib/params";

export type AnyCanvas = OffscreenCanvas | HTMLCanvasElement;
type Ctx = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

export function createCanvas(width: number, height: number): AnyCanvas {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(width, height);
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  return c;
}

export function context(c: AnyCanvas, willRead = false): Ctx {
  const ctx = c.getContext("2d", { willReadFrequently: willRead }) as Ctx | null;
  if (!ctx) throw new Error("캔버스를 만들 수 없어요. 이미지가 너무 크거나 메모리가 부족할 수 있어요.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  return ctx;
}

function stepDown(source: CanvasImageSource, rect: ReturnType<typeof cropRect>, target: Size) {
  let image = source;
  let { x, y, width, height } = rect;
  while (width / 2 >= target.width && height / 2 >= target.height) {
    const w = Math.round(width / 2);
    const h = Math.round(height / 2);
    const c = createCanvas(w, h);
    context(c).drawImage(image, x, y, width, height, 0, 0, w, h);
    image = c;
    [x, y, width, height] = [0, 0, w, h];
  }
  return { image, x, y, width, height };
}

export function render(source: CanvasImageSource, src: Size, p: EditParams, opts: { max?: Size; filters?: boolean } = {}) {
  const out = outputSize(src, p);
  const size = opts.max ? fitSize(out, opts.max) : out;
  const quarter = p.rotate % 180 !== 0;
  const draw = quarter ? { width: size.height, height: size.width } : size;
  const s = stepDown(source, cropRect(src, p.crop), draw);

  const canvas = createCanvas(size.width, size.height);
  const withFilters = opts.filters !== false && hasFilters(p);
  const ctx = context(canvas, withFilters);
  ctx.translate(size.width / 2, size.height / 2);
  ctx.scale(p.flipX ? -1 : 1, p.flipY ? -1 : 1);
  ctx.rotate((p.rotate * Math.PI) / 180);
  ctx.drawImage(s.image, s.x, s.y, s.width, s.height, -draw.width / 2, -draw.height / 2, draw.width, draw.height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  if (withFilters) {
    const img = ctx.getImageData(0, 0, size.width, size.height);
    applyFilters(img, p);
    ctx.putImageData(img, 0, 0);
  }
  return canvas;
}

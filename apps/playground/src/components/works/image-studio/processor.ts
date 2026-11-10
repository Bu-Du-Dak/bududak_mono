import type { OutputFormat } from "./lib/format";
import type { Size } from "./lib/geometry";
import { DEFAULT_PARAMS, type EditParams } from "./lib/params";
import { actualType, encode, supportedFormats } from "./encode";
import { type AnyCanvas, render } from "./pipeline";

export const PREVIEW_MAX: Size = { width: 1600, height: 1600 };

export type PreviewResult = { after: ImageBitmap; before?: ImageBitmap; ms: number };
export type ExportResult = { blob: Blob; requested: OutputFormat; actual: string | null; width: number; height: number; ms: number };

export interface ImageProcessor {
  load(bitmap: ImageBitmap): Promise<ImageBitmap>;
  preview(params: EditParams, withBefore: boolean): Promise<PreviewResult>;
  export(params: EditParams, format: OutputFormat, quality: number): Promise<ExportResult>;
  formats(): Promise<OutputFormat[]>;
  dispose(): void;
}

const toBitmap = (c: AnyCanvas) =>
  "transferToImageBitmap" in c ? Promise.resolve(c.transferToImageBitmap()) : createImageBitmap(c);

export class Processor implements ImageProcessor {
  private source: ImageBitmap | null = null;
  private size: Size = { width: 0, height: 0 };

  private get src() {
    if (!this.source) throw new Error("이미지가 없어요.");
    return this.source;
  }

  async load(bitmap: ImageBitmap) {
    this.source?.close();
    this.source = bitmap;
    this.size = { width: bitmap.width, height: bitmap.height };
    return toBitmap(render(bitmap, this.size, DEFAULT_PARAMS, { max: PREVIEW_MAX }));
  }

  async preview(params: EditParams, withBefore: boolean) {
    const t0 = performance.now();
    const after = await toBitmap(render(this.src, this.size, params, { max: PREVIEW_MAX }));
    const ms = performance.now() - t0;
    const before = withBefore
      ? await toBitmap(render(this.src, this.size, params, { max: PREVIEW_MAX, filters: false }))
      : undefined;
    return { after, before, ms };
  }

  async export(params: EditParams, format: OutputFormat, quality: number) {
    const t0 = performance.now();
    const canvas = render(this.src, this.size, params);
    const blob = await encode(canvas, format, quality);
    return {
      blob,
      requested: format,
      actual: await actualType(blob),
      width: canvas.width,
      height: canvas.height,
      ms: performance.now() - t0,
    };
  }

  formats() {
    return supportedFormats();
  }

  dispose() {
    this.source?.close();
    this.source = null;
  }
}

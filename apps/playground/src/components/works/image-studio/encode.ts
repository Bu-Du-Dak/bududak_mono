import { type OutputFormat, OUTPUT_FORMATS, sniff } from "./lib/format";
import { type AnyCanvas, context, createCanvas } from "./pipeline";

export async function encode(canvas: AnyCanvas, type: OutputFormat, quality: number): Promise<Blob> {
  let c = canvas;
  if (type === "image/jpeg") {
    c = createCanvas(canvas.width, canvas.height);
    const ctx = context(c);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(canvas, 0, 0);
  }
  const q = quality / 100;
  if ("convertToBlob" in c) return c.convertToBlob({ type, quality: q });
  const html = c;
  return new Promise((resolve, reject) =>
    html.toBlob((b) => (b ? resolve(b) : reject(new Error("이미지를 인코딩하지 못했어요."))), type, q),
  );
}

export const actualType = async (blob: Blob) => sniff(new Uint8Array(await blob.slice(0, 16).arrayBuffer()));

export async function supportedFormats(): Promise<OutputFormat[]> {
  const list: OutputFormat[] = [];
  for (const { type } of OUTPUT_FORMATS) {
    const probe = createCanvas(1, 1);
    context(probe).fillRect(0, 0, 1, 1);
    const actual = await encode(probe, type, 90).then(actualType, () => null);
    if (actual === type) list.push(type);
  }
  return list;
}

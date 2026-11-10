import { sniff, type InputFormat } from "./format";
import type { Size } from "./geometry";

export const MAX_FILE_BYTES = 50 * 1024 * 1024;
export const MAX_PIXELS = 4096 * 4096;

export type FileCheck = { ok: true; format: InputFormat } | { ok: false; message: string };

export function checkFile(size: number, header: Uint8Array): FileCheck {
  if (size === 0) return { ok: false, message: "빈 파일이에요." };
  if (size > MAX_FILE_BYTES) return { ok: false, message: "50MB 이하 파일만 열 수 있어요." };
  const format = sniff(header);
  if (!format) return { ok: false, message: "지원하지 않는 형식이에요. JPEG, PNG, WebP, GIF 파일을 올려주세요." };
  return { ok: true, format };
}

export function capPixels(size: Size, maxPixels = MAX_PIXELS): Size {
  const scale = Math.min(1, Math.sqrt(maxPixels / (size.width * size.height)));
  if (scale === 1) return size;
  return { width: Math.max(1, Math.floor(size.width * scale)), height: Math.max(1, Math.floor(size.height * scale)) };
}

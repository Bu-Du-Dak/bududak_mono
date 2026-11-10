export type InputFormat = "image/jpeg" | "image/png" | "image/webp" | "image/gif";
export type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export const OUTPUT_FORMATS: { type: OutputFormat; label: string; ext: string; lossy: boolean }[] = [
  { type: "image/jpeg", label: "JPEG", ext: "jpg", lossy: true },
  { type: "image/png", label: "PNG", ext: "png", lossy: false },
  { type: "image/webp", label: "WebP", ext: "webp", lossy: true },
];

export const formatLabel = (type: string) =>
  ({ "image/jpeg": "JPEG", "image/png": "PNG", "image/webp": "WebP", "image/gif": "GIF" })[type] ?? type;

const starts = (b: Uint8Array, sig: number[], offset = 0) => sig.every((v, i) => b[offset + i] === v);

export function sniff(b: Uint8Array): InputFormat | null {
  if (starts(b, [0xff, 0xd8, 0xff])) return "image/jpeg";
  if (starts(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  if (starts(b, [0x52, 0x49, 0x46, 0x46]) && starts(b, [0x57, 0x45, 0x42, 0x50], 8)) return "image/webp";
  if (starts(b, [0x47, 0x49, 0x46, 0x38])) return "image/gif";
  return null;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

export function toFileName(name: string, type: string) {
  const ext = OUTPUT_FORMATS.find((f) => f.type === type)?.ext ?? "png";
  const base = name
    .replace(/\.(jpe?g|png|webp|gif)$/i, "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "")
    .trim()
    .slice(0, 100);
  return `${base || "image"}.${ext}`;
}

export const baseName = (fileName: string) => fileName.replace(/\.[^.]+$/, "");

import { capPixels, checkFile } from "./lib/validate";
import type { InputFormat } from "./lib/format";

export type LoadedImage = {
  bitmap: ImageBitmap;
  format: InputFormat;
  original: { width: number; height: number };
  notice?: string;
};

async function decode(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return await createImageBitmap(img);
    } catch {
      throw new Error("이미지를 읽을 수 없어요. 파일이 손상됐을 수 있어요.");
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

export async function loadImage(file: File): Promise<LoadedImage> {
  const check = checkFile(file.size, new Uint8Array(await file.slice(0, 16).arrayBuffer()));
  if (!check.ok) throw new Error(check.message);

  let bitmap = await decode(file);
  const original = { width: bitmap.width, height: bitmap.height };
  const capped = capPixels(original);
  if (capped.width === original.width) return { bitmap, format: check.format, original };

  const resized = await createImageBitmap(bitmap, {
    resizeWidth: capped.width,
    resizeHeight: capped.height,
    resizeQuality: "high",
  });
  bitmap.close();
  bitmap = resized;
  return {
    bitmap,
    format: check.format,
    original,
    notice: `원본(${original.width}×${original.height})이 너무 커서 ${capped.width}×${capped.height}로 줄여 편집해요.`,
  };
}

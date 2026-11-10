import { useCallback, useEffect, useRef, useState } from "react";
import type { OutputFormat } from "./lib/format";
import type { EditParams } from "./lib/params";
import type { Size } from "./lib/geometry";
import type { ImageProcessor, PreviewResult } from "./processor";
import { Processor } from "./processor";
import { createProcessor } from "./processorClient";
import { type LoadedImage, loadImage } from "./loadImage";

type PreviewRequest = { params: EditParams; withBefore: boolean };

const closePreview = (p: PreviewResult | null) => {
  p?.after.close();
  p?.before?.close();
};

export function useImageProcessor() {
  const proc = useRef<ImageProcessor | null>(null);
  const lastFile = useRef<File | null>(null);
  const [mode, setMode] = useState<"worker" | "main" | null>(null);
  const [formats, setFormats] = useState<OutputFormat[] | null>(null);
  const [original, setOriginal] = useState<ImageBitmap | null>(null);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [error, setError] = useState("");
  const shown = useRef<{ original: ImageBitmap | null; preview: PreviewResult | null }>({ original: null, preview: null });

  const inflight = useRef(false);
  const pending = useRef<PreviewRequest | null>(null);
  const pump = useCallback(async () => {
    const p = proc.current;
    if (inflight.current || !pending.current || !p) return;
    const req = pending.current;
    pending.current = null;
    inflight.current = true;
    try {
      const result = await p.preview(req.params, req.withBefore);
      const old = shown.current.preview;
      shown.current.preview = result;
      setPreview(result);
      setError("");
      closePreview(old);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      inflight.current = false;
      void pump();
    }
  }, []);

  const open = useCallback(async (file: File): Promise<Omit<LoadedImage, "bitmap"> & { working: Size }> => {
    const { bitmap, ...info } = await loadImage(file);
    const working = { width: bitmap.width, height: bitmap.height };
    const p = proc.current;
    if (!p) {
      bitmap.close();
      throw new Error("처리기가 아직 준비되지 않았어요.");
    }
    lastFile.current = file;
    const originalPreview = await p.load(bitmap);
    shown.current.original?.close();
    shown.current.original = originalPreview;
    setOriginal(originalPreview);
    closePreview(shown.current.preview);
    shown.current.preview = null;
    setPreview(null);
    return { ...info, working };
  }, []);

  useEffect(() => {
    let alive = true;
    const start = (p: ImageProcessor, m: "worker" | "main") => {
      proc.current = p;
      setMode(m);
      p.formats().then((f) => alive && setFormats(f), () => alive && setFormats(["image/png"]));
    };
    const { processor, mode } = createProcessor(() => {
      if (!alive) return;
      proc.current?.dispose();
      inflight.current = false;
      start(new Processor(), "main");
      const file = lastFile.current;
      if (file) open(file).then(() => void pump(), (e) => setError(String(e)));
    });
    start(processor, mode);
    const s = shown.current;
    return () => {
      alive = false;
      proc.current?.dispose();
      proc.current = null;
      s.original?.close();
      closePreview(s.preview);
    };
  }, [open, pump]);

  return {
    mode,
    formats,
    original,
    preview,
    error,
    open,
    requestPreview: useCallback(
      (params: EditParams, withBefore: boolean) => {
        pending.current = { params, withBefore };
        void pump();
      },
      [pump],
    ),
    exportImage: useCallback((params: EditParams, format: OutputFormat, quality: number) => {
      if (!proc.current) return Promise.reject(new Error("처리기가 준비되지 않았어요."));
      return proc.current.export(params, format, quality);
    }, []),
  };
}

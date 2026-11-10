import { type ImageProcessor, Processor } from "./processor";

type Pending = { resolve: (v: never) => void; reject: (e: Error) => void };

function createWorkerProcessor(onCrash: () => void): ImageProcessor {
  const worker = new Worker(new URL("./processor.worker.ts", import.meta.url), { type: "module" });
  const pending = new Map<number, Pending>();
  let nextId = 0;

  worker.onmessage = (e: MessageEvent<{ id: number; result?: unknown; error?: string }>) => {
    const p = pending.get(e.data.id);
    if (!p) return;
    pending.delete(e.data.id);
    if (e.data.error !== undefined) p.reject(new Error(e.data.error));
    else p.resolve(e.data.result as never);
  };
  worker.onerror = () => {
    for (const p of pending.values()) p.reject(new Error("워커 오류"));
    pending.clear();
    onCrash();
  };

  const call = <T>(method: string, args: unknown[], transfer: Transferable[] = []) =>
    new Promise<T>((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve: resolve as (v: never) => void, reject });
      worker.postMessage({ id, method, args }, transfer);
    });

  return {
    load: (bitmap) => call("load", [bitmap], [bitmap]),
    preview: (params, withBefore) => call("preview", [params, withBefore]),
    export: (params, format, quality) => call("export", [params, format, quality]),
    formats: () => call("formats", []),
    dispose: () => worker.terminate(),
  };
}

export function createProcessor(onCrash: () => void): { processor: ImageProcessor; mode: "worker" | "main" } {
  const canUseWorker =
    typeof Worker !== "undefined" &&
    typeof OffscreenCanvas !== "undefined" &&
    "transferToImageBitmap" in OffscreenCanvas.prototype;
  try {
    if (canUseWorker) return { processor: createWorkerProcessor(onCrash), mode: "worker" };
  } catch (e) {
    console.warn("Web Worker 를 만들 수 없어 메인 스레드에서 처리합니다.", e);
  }
  return { processor: new Processor(), mode: "main" };
}

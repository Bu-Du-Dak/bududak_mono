import { Processor } from "./processor";

type Request = { id: number; method: "load" | "preview" | "export" | "formats"; args: unknown[] };

const processor = new Processor();
const post = (message: unknown, transfer: Transferable[] = []) =>
  (self as unknown as { postMessage(m: unknown, t: Transferable[]): void }).postMessage(message, transfer);

self.onmessage = async (e: MessageEvent<Request>) => {
  const { id, method, args } = e.data;
  try {
    const run = processor[method] as (...a: unknown[]) => Promise<unknown>;
    const result = await run.apply(processor, args);
    const values = result instanceof ImageBitmap ? [result] : result && typeof result === "object" ? Object.values(result) : [];
    const transfer = values.filter((v): v is ImageBitmap => v instanceof ImageBitmap);
    post({ id, result }, transfer);
  } catch (err) {
    post({ id, error: err instanceof Error ? err.message : String(err) });
  }
};

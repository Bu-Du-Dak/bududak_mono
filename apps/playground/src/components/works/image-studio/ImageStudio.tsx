"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import DropZone, { useFilePicker } from "./DropZone";
import Preview, { type View } from "./Preview";
import CropOverlay from "./CropOverlay";
import EditPanel from "./EditPanel";
import ExportBar, { type ImageInfo } from "./ExportBar";
import { useImageProcessor } from "./useImageProcessor";
import type { ExportResult } from "./processor";
import { baseName, type OutputFormat, toFileName } from "./lib/format";
import { aspectRect, type Crop, cropToDisplay, displayToCrop, isFull, outputSize } from "./lib/geometry";
import { DEFAULT_PARAMS, reducer } from "./lib/params";
import { Button, Muted, Row } from "../common/styles";
import { media } from "../../../../../../packages/ui/src/styles/breakPoints";

const VIEWS: { id: View; label: string }[] = [
  { id: "after", label: "결과" },
  { id: "original", label: "원본" },
  { id: "split", label: "전후 비교" },
];

export default function ImageStudio() {
  const proc = useImageProcessor();
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [params, dispatch] = useReducer(reducer, DEFAULT_PARAMS);
  const [format, setFormat] = useState<OutputFormat>("image/webp");
  const [quality, setQuality] = useState(80);
  const [fileName, setFileName] = useState("");
  const [view, setView] = useState<View>("after");
  const [split, setSplit] = useState(0.5);
  const [cropDraft, setCropDraft] = useState<Crop | null>(null);
  const [aspect, setAspect] = useState<number | null>(null);
  const [estimate, setEstimate] = useState<{ key: string; result?: ExportResult; error?: string } | null>(null);
  const [downloading, setDownloading] = useState(false);
  const cropping = cropDraft !== null;

  const outFormat: OutputFormat = !proc.formats || proc.formats.includes(format) ? format : (proc.formats[0] ?? "image/png");
  const exportKey = JSON.stringify({ params, outFormat, quality });

  const open = async (file: File) => {
    setLoading(true);
    setLoadError("");
    try {
      const info = await proc.open(file);
      setImage({ name: file.name, bytes: file.size, ...info });
      dispatch({ type: "reset" });
      setCropDraft(null);
      setView("after");
      setEstimate(null);
      setFileName(`${baseName(file.name)}-edited`);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };
  const picker = useFilePicker(open);

  const { requestPreview, exportImage } = proc;

  useEffect(() => {
    if (!image) return;
    const p = cropping ? { ...params, crop: null, resize: null } : params;
    requestPreview(p, view === "split" && !cropping);
  }, [image, params, cropping, view, requestPreview]);

  const latestKey = useRef(exportKey);
  useEffect(() => {
    latestKey.current = exportKey;
    if (!image || cropping) return;
    const timer = setTimeout(() => {
      exportImage(params, outFormat, quality).then(
        (result) => latestKey.current === exportKey && setEstimate({ key: exportKey, result }),
        (e) => latestKey.current === exportKey && setEstimate({ key: exportKey, error: e instanceof Error ? e.message : String(e) }),
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [exportKey, image, cropping, exportImage, params, outFormat, quality]);

  if (!image) {
    return (
      <>
        <DropZone onFile={open} loading={loading} error={loadError || proc.error} />
        <ModeNote mode={proc.mode} />
      </>
    );
  }

  const current = estimate?.key === exportKey ? estimate : null;

  const download = async () => {
    setDownloading(true);
    try {
      const result = current?.result ?? (await exportImage(params, outFormat, quality));
      const url = URL.createObjectURL(result.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = toFileName(fileName, result.actual ?? result.requested);
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      setEstimate({ key: exportKey, error: e instanceof Error ? e.message : String(e) });
    } finally {
      setDownloading(false);
    }
  };

  const startCrop = () => {
    const shown = proc.preview?.after ?? { width: 1, height: 1 };
    setCropDraft(params.crop ? cropToDisplay(params.crop, params) : aspectRect(aspect, { width: shown.width, height: shown.height }));
    setView("after");
  };
  const applyCrop = () => {
    if (cropDraft) dispatch({ type: "crop", crop: isFull(cropDraft) ? null : displayToCrop(cropDraft, params) });
    setCropDraft(null);
  };
  const displaySize = proc.preview ? { width: proc.preview.after.width, height: proc.preview.after.height } : { width: 1, height: 1 };

  return (
    <Studio>
      {picker.input}
      <ExportBar
        image={image}
        output={outputSize(image.working, params)}
        formats={proc.formats}
        format={outFormat}
        onFormat={setFormat}
        quality={quality}
        onQuality={setQuality}
        fileName={fileName}
        onFileName={setFileName}
        estimate={current?.result ?? null}
        estimateError={current?.error ?? ""}
        openError={loadError}
        downloading={downloading}
        onDownload={download}
        onPickFile={picker.open}
      />
      <Layout>
        <Main>
          <Row role="radiogroup" aria-label="보기">
            {VIEWS.map((v) => (
              <Button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={view === v.id}
                $active={view === v.id}
                disabled={cropping}
                onClick={() => setView(v.id)}
              >
                {v.label}
              </Button>
            ))}
          </Row>
          <Preview preview={proc.preview} original={proc.original} view={cropping ? "after" : view} split={split} onSplit={setSplit}>
            {cropDraft && proc.preview && (
              <CropOverlay rect={cropDraft} aspect={aspect} size={displaySize} onChange={setCropDraft} />
            )}
          </Preview>
          <Muted aria-live="polite">
            {proc.error
              ? proc.error
              : proc.preview
                ? `미리보기 처리 ${proc.preview.ms.toFixed(0)}ms · ${proc.mode === "worker" ? "Web Worker" : "메인 스레드"}에서 처리 · 미리보기는 축소본, 다운로드는 원본 해상도`
                : "처리 중…"}
          </Muted>
        </Main>
        <EditPanel
          params={params}
          dispatch={dispatch}
          src={image.working}
          cropping={cropping}
          aspect={aspect}
          onAspect={(a) => {
            setAspect(a);
            setCropDraft(aspectRect(a, displaySize));
          }}
          onStartCrop={startCrop}
          onApplyCrop={applyCrop}
          onCancelCrop={() => setCropDraft(null)}
        />
      </Layout>
    </Studio>
  );
}

function ModeNote({ mode }: { mode: "worker" | "main" | null }) {
  if (mode !== "main") return null;
  return <Muted style={{ marginTop: "1.2rem" }}>이 브라우저는 Web Worker 이미지 처리를 지원하지 않아 화면 스레드에서 처리해요. 큰 이미지는 잠깐 멈출 수 있어요.</Muted>;
}

const Studio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 30rem;
  gap: 2.4rem;
  align-items: start;
  ${media.lt("web")} {
    grid-template-columns: minmax(0, 1fr);
  }
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-width: 0;
`;

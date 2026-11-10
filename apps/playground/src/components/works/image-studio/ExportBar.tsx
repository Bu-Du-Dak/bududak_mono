"use client";
import styled from "styled-components";
import { formatBytes, formatLabel, type InputFormat, OUTPUT_FORMATS, type OutputFormat } from "./lib/format";
import type { Size } from "./lib/geometry";
import type { ExportResult } from "./processor";
import { Button, Muted, Panel, Row } from "../common/styles";

export type ImageInfo = { name: string; bytes: number; format: InputFormat; original: Size; working: Size; notice?: string };

type Props = {
  image: ImageInfo;
  output: Size;
  formats: OutputFormat[] | null;
  format: OutputFormat;
  onFormat: (f: OutputFormat) => void;
  quality: number;
  onQuality: (q: number) => void;
  fileName: string;
  onFileName: (n: string) => void;
  estimate: ExportResult | null;
  estimateError: string;
  openError: string;
  downloading: boolean;
  onDownload: () => void;
  onPickFile: () => void;
};

export default function ExportBar(p: Props) {
  const meta = OUTPUT_FORMATS.find((f) => f.type === p.format)!;
  const e = p.estimate;
  const diff = e ? Math.round(((e.blob.size - p.image.bytes) / p.image.bytes) * 100) : 0;

  return (
    <Panel aria-label="내보내기">
      <Top>
        <Info>
          <strong title={p.image.name}>{p.image.name}</strong>
          <Muted>
            {formatLabel(p.image.format)} · {p.image.original.width}×{p.image.original.height} · {formatBytes(p.image.bytes)}
          </Muted>
        </Info>
        <Button type="button" onClick={p.onPickFile}>
          다른 이미지
        </Button>
      </Top>
      {p.image.notice && <Notice role="status">{p.image.notice}</Notice>}
      {p.openError && <Bad role="alert">{p.openError}</Bad>}

      <Controls>
        <Field>
          형식
          <select value={p.format} onChange={(ev) => p.onFormat(ev.target.value as OutputFormat)} disabled={!p.formats}>
            {OUTPUT_FORMATS.map((f) => (
              <option key={f.type} value={f.type} disabled={!!p.formats && !p.formats.includes(f.type)}>
                {f.label}
                {p.formats && !p.formats.includes(f.type) ? " (이 브라우저 미지원)" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field $grow>
          품질
          <input
            type="range"
            min={10}
            max={100}
            value={meta.lossy ? p.quality : 100}
            disabled={!meta.lossy}
            onChange={(ev) => p.onQuality(Number(ev.target.value))}
            aria-valuetext={meta.lossy ? `${p.quality}` : "PNG는 무손실"}
          />
          <b>{meta.lossy ? p.quality : "무손실"}</b>
        </Field>
        <Field $grow>
          파일명
          <NameInput value={p.fileName} onChange={(ev) => p.onFileName(ev.target.value)} maxLength={100} />
          <span>.{meta.ext}</span>
        </Field>
        <Button type="button" $primary onClick={p.onDownload} disabled={p.downloading}>
          {p.downloading ? "만드는 중…" : "⬇ 다운로드"}
        </Button>
      </Controls>

      <Row>
        <Result aria-live="polite">
          결과 {p.output.width}×{p.output.height} ·{" "}
          {p.estimateError ? (
            <Bad>{p.estimateError}</Bad>
          ) : e ? (
            <>
              {formatLabel(e.actual ?? e.requested)} {formatBytes(e.blob.size)}{" "}
              <Diff $smaller={diff <= 0}>
                ({diff > 0 ? "+" : ""}
                {diff}%)
              </Diff>{" "}
              · 처리 {e.ms.toFixed(0)}ms
              {e.actual !== e.requested && <Bad> · 브라우저가 {formatLabel(e.requested)} 대신 {formatLabel(e.actual ?? "?")}로 만들었어요</Bad>}
            </>
          ) : (
            "용량 계산 중…"
          )}
        </Result>
      </Row>
      <Muted>다시 인코딩하면서 촬영 위치·기기 정보(EXIF)는 제거돼요. 이미지는 브라우저 밖으로 전송되지 않아요.</Muted>
    </Panel>
  );
}

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  strong {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const Notice = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: #f59e0b;
`;
const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem 1.6rem;
`;
const Field = styled.label<{ $grow?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex: ${({ $grow }) => ($grow ? "1 1 16rem" : "0 0 auto")};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  select,
  input[type="range"] {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
  input[type="range"] {
    flex: 1;
    min-width: 6rem;
  }
  select {
    padding: 0.6rem 0.8rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.border};
    border-radius: 0.6rem;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
  }
  b {
    min-width: 4rem;
    color: ${({ theme }) => theme.colors.text};
    font-variant-numeric: tabular-nums;
  }
`;
const NameInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0.6rem 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  color: ${({ theme }) => theme.colors.text};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
const Result = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-variant-numeric: tabular-nums;
`;
const Diff = styled.b<{ $smaller: boolean }>`
  color: ${({ $smaller }) => ($smaller ? "#10b981" : "#f59e0b")};
`;
const Bad = styled.span`
  color: #ef4444;
`;

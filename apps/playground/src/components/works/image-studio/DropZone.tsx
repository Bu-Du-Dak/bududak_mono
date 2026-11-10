"use client";
import { useRef, useState } from "react";
import styled from "styled-components";
import { MAX_FILE_BYTES } from "./lib/validate";

export const ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

export function useFilePicker(onFile: (file: File) => void) {
  const ref = useRef<HTMLInputElement>(null);
  const input = (
    <input
      ref={ref}
      type="file"
      accept={ACCEPT}
      hidden
      onChange={(e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (file) onFile(file);
      }}
    />
  );
  return { input, open: () => ref.current?.click() };
}

type Props = { onFile: (file: File) => void; loading: boolean; error: string };

export default function DropZone({ onFile, loading, error }: Props) {
  const [over, setOver] = useState(false);
  const picker = useFilePicker(onFile);

  return (
    <Zone
      $over={over}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const file = e.dataTransfer.files[0];
        if (file) onFile(file);
      }}
    >
      {picker.input}
      <Icon aria-hidden>🖼️</Icon>
      <strong>{loading ? "이미지를 여는 중…" : "이미지를 여기에 끌어다 놓으세요"}</strong>
      <PickButton type="button" onClick={picker.open} disabled={loading}>
        파일 선택
      </PickButton>
      <Hint>
        JPEG · PNG · WebP · GIF(첫 프레임) · 최대 {MAX_FILE_BYTES / 1024 / 1024}MB
        <br />
        이미지는 브라우저 안에서만 처리되고 서버로 전송되지 않아요.
      </Hint>
      {error && <Error role="alert">{error}</Error>}
    </Zone>
  );
}

const Zone = styled.div<{ $over: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  min-height: 36rem;
  padding: 3.2rem 1.6rem;
  text-align: center;
  border: 0.2rem dashed ${({ theme, $over }) => ($over ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme, $over }) => ($over ? `${theme.colors.primary}14` : "transparent")};
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
`;
const Icon = styled.span`
  font-size: 4.8rem;
`;
const PickButton = styled.button`
  padding: 1rem 2.4rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: 0.2rem;
  }
`;
const Hint = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;
const Error = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: #ef4444;
`;

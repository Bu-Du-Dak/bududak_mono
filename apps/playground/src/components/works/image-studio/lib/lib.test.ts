import { adjustColors, blur, effectPx, pixelate, type Pixels } from "./filters";
import { baseName, formatBytes, sniff, toFileName } from "./format";
import { aspectRect, baseSize, cropRect, cropToDisplay, displayToCrop, dragCorner, fitSize, fromDisplay, isFull, moveRect, ratioSize, toDisplay, type Rotation } from "./geometry";
import { DEFAULT_PARAMS, hasFilters, reducer } from "./params";
import { capPixels, checkFile, MAX_FILE_BYTES, MAX_PIXELS } from "./validate";

const solid = (w: number, h: number, rgba: [number, number, number, number]): Pixels => {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < data.length; i += 4) data.set(rgba, i);
  return { data, width: w, height: h };
};
const px = (img: Pixels, x: number, y: number) => Array.from(img.data.slice((y * img.width + x) * 4, (y * img.width + x) * 4 + 4));
const bytes = (...b: number[]) => new Uint8Array([...b, ...new Array(16).fill(0)].slice(0, 16));

describe("형식 판별", () => {
  it("시그니처로 판별한다", () => {
    expect(sniff(bytes(0xff, 0xd8, 0xff, 0xe0))).toBe("image/jpeg");
    expect(sniff(bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a))).toBe("image/png");
    expect(sniff(bytes(0x52, 0x49, 0x46, 0x46, 1, 2, 3, 4, 0x57, 0x45, 0x42, 0x50))).toBe("image/webp");
    expect(sniff(bytes(0x47, 0x49, 0x46, 0x38, 0x39, 0x61))).toBe("image/gif");
    expect(sniff(bytes(0x52, 0x49, 0x46, 0x46, 1, 2, 3, 4, 0x57, 0x41, 0x56, 0x45))).toBeNull();
    expect(sniff(bytes(0x25, 0x50, 0x44, 0x46))).toBeNull();
  });

  it("파일 검증: 빈 파일·용량 초과·미지원 형식", () => {
    const png = bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
    expect(checkFile(1000, png)).toEqual({ ok: true, format: "image/png" });
    expect(checkFile(0, png).ok).toBe(false);
    expect(checkFile(MAX_FILE_BYTES + 1, png).ok).toBe(false);
    expect(checkFile(1000, bytes(0x25, 0x50, 0x44, 0x46)).ok).toBe(false);
  });

  it("최대 면적을 넘으면 비율 유지 축소", () => {
    expect(capPixels({ width: 1000, height: 800 })).toEqual({ width: 1000, height: 800 });
    const s = capPixels({ width: 8000, height: 6000 });
    expect(s.width * s.height).toBeLessThanOrEqual(MAX_PIXELS);
    expect(Math.abs(s.width / s.height - 8 / 6)).toBeLessThan(0.01);
  });

  it("파일명 정리와 확장자", () => {
    expect(toFileName("my photo.jpg", "image/webp")).toBe("my photo.webp");
    expect(toFileName('a/b:c*?"<>|.png', "image/jpeg")).toBe("abc.jpg");
    expect(toFileName("   ", "image/png")).toBe("image.png");
    expect(baseName("cat.final.jpeg")).toBe("cat.final");
    expect(formatBytes(512)).toBe("512B");
    expect(formatBytes(2048)).toBe("2.0KB");
    expect(formatBytes(3 * 1024 * 1024)).toBe("3.00MB");
  });
});

describe("기하 계산", () => {
  const src = { width: 400, height: 200 };

  it("크롭 영역과 회전 후 크기", () => {
    expect(cropRect(src, { x: 0.25, y: 0.5, w: 0.5, h: 0.5 })).toEqual({ x: 100, y: 100, width: 200, height: 100 });
    expect(baseSize(src, { crop: null, rotate: 90 })).toEqual({ width: 200, height: 400 });
    expect(baseSize(src, { crop: { x: 0, y: 0, w: 0.5, h: 1 }, rotate: 270 })).toEqual({ width: 200, height: 200 });
  });

  it("범위를 벗어난 크롭은 이미지 안으로 제한", () => {
    const r = cropRect(src, { x: 0.9, y: 0.9, w: 0.5, h: 0.5 });
    expect(r.x + r.width).toBeLessThanOrEqual(400);
    expect(r.y + r.height).toBeLessThanOrEqual(200);
    expect(r.width).toBeGreaterThanOrEqual(1);
  });

  it("fitSize 는 축소만, ratioSize 는 비율 유지", () => {
    expect(fitSize({ width: 4000, height: 2000 }, { width: 1600, height: 1600 })).toEqual({ width: 1600, height: 800 });
    expect(fitSize({ width: 100, height: 50 }, { width: 1600, height: 1600 })).toEqual({ width: 100, height: 50 });
    expect(ratioSize({ width: 400, height: 200 }, { width: 100 })).toEqual({ width: 100, height: 50 });
    expect(ratioSize({ width: 400, height: 200 }, { height: 100 })).toEqual({ width: 200, height: 100 });
  });

  it("90° 회전: 원본 왼쪽 위 → 화면 오른쪽 위", () => {
    expect(toDisplay([0, 0], { rotate: 90, flipX: false, flipY: false })).toEqual([1, 0]);
    expect(toDisplay([1, 0], { rotate: 90, flipX: false, flipY: false })).toEqual([1, 1]);
  });

  it("모든 회전·반전 조합에서 화면 ↔ 원본 좌표 변환이 서로 역변환", () => {
    const crop = { x: 0.1, y: 0.2, w: 0.3, h: 0.5 };
    for (const rotate of [0, 90, 180, 270] as Rotation[])
      for (const flipX of [false, true])
        for (const flipY of [false, true]) {
          const o = { rotate, flipX, flipY };
          const [x, y] = fromDisplay(toDisplay([0.3, 0.7], o), o);
          expect(x).toBeCloseTo(0.3);
          expect(y).toBeCloseTo(0.7);
          const back = displayToCrop(cropToDisplay(crop, o), o);
          expect(back.x).toBeCloseTo(crop.x);
          expect(back.y).toBeCloseTo(crop.y);
          expect(back.w).toBeCloseTo(crop.w);
          expect(back.h).toBeCloseTo(crop.h);
          const d = cropToDisplay(crop, o);
          expect(rotate % 180 ? [d.w, d.h] : [d.h, d.w]).toEqual([expect.closeTo(0.5), expect.closeTo(0.3)]);
        }
  });
});

describe("크롭 편집", () => {
  const wide = { width: 400, height: 200 };
  const pxRatio = (r: { w: number; h: number }) => (r.w * wide.width) / (r.h * wide.height);

  it("비율 프리셋: 이미지 안의 가장 큰 가운데 영역", () => {
    const sq = aspectRect(1, wide);
    expect(pxRatio(sq)).toBeCloseTo(1);
    expect(sq.h).toBeCloseTo(1);
    expect(sq.x).toBeCloseTo(0.25);
    expect(aspectRect(null, wide)).toEqual({ x: 0, y: 0, w: 1, h: 1 });
  });

  it("모서리 드래그: 반대 방향으로 끌어도 영역이 맞고, 비율 고정이 유지됨", () => {
    expect(dragCorner([0.5, 0.5], [0.8, 0.9], null, wide)).toEqual({ x: 0.5, y: 0.5, w: expect.closeTo(0.3), h: expect.closeTo(0.4) });
    const r = dragCorner([0.5, 0.5], [0.1, 0.2], null, wide);
    expect([r.x, r.y, r.w, r.h].map((v) => +v.toFixed(3))).toEqual([0.1, 0.2, 0.4, 0.3]);
    const fixed = dragCorner([0.2, 0.2], [0.9, 0.9], 16 / 9, wide);
    expect(pxRatio(fixed)).toBeCloseTo(16 / 9);
  });

  it("모서리 드래그·이동은 이미지 밖으로 나가지 않음", () => {
    for (const p of [[1.5, 1.5], [-1, -1], [1.2, -0.4]] as [number, number][])
      for (const aspect of [null, 1, 16 / 9]) {
        const r = dragCorner([0.3, 0.6], p, aspect, wide);
        expect(r.x).toBeGreaterThanOrEqual(-1e-9);
        expect(r.y).toBeGreaterThanOrEqual(-1e-9);
        expect(r.x + r.w).toBeLessThanOrEqual(1 + 1e-9);
        expect(r.y + r.h).toBeLessThanOrEqual(1 + 1e-9);
      }
    const m = moveRect({ x: 0.5, y: 0.5, w: 0.4, h: 0.4 }, 0.5, -0.9);
    expect(m).toEqual({ x: expect.closeTo(0.6), y: 0, w: 0.4, h: 0.4 });
  });

  it("거의 전체면 크롭 없음", () => {
    expect(isFull({ x: 0, y: 0, w: 1, h: 1 })).toBe(true);
    expect(isFull({ x: 0, y: 0, w: 0.9, h: 1 })).toBe(false);
  });
});

describe("편집 파라미터", () => {
  const src = { width: 400, height: 200 };

  it("비율 유지 리사이즈", () => {
    const p = reducer(DEFAULT_PARAMS, { type: "resize", by: { width: 100 }, src });
    expect(p.resize).toEqual({ width: 100, height: 50 });
  });

  it("비율 해제 후 한 변만 바꾸면 다른 변은 유지", () => {
    let p = reducer(DEFAULT_PARAMS, { type: "keepRatio", value: false, src });
    p = reducer(p, { type: "resize", by: { width: 100 }, src });
    expect(p.resize).toEqual({ width: 100, height: 200 });
    p = reducer(p, { type: "keepRatio", value: true, src });
    expect(p.resize).toEqual({ width: 100, height: 50 });
  });

  it("리사이즈 값은 1 이상 정수이고 최대 면적을 넘지 않음", () => {
    let p = reducer(DEFAULT_PARAMS, { type: "resize", by: { width: 0.4 }, src });
    expect(p.resize!.width).toBeGreaterThanOrEqual(1);
    p = reducer(DEFAULT_PARAMS, { type: "resize", by: { width: 100000 }, src });
    expect(p.resize!.width * p.resize!.height).toBeLessThanOrEqual(MAX_PIXELS);
  });

  it("90° 회전하면 리사이즈 가로·세로가 바뀌고, 크롭하면 리사이즈 해제", () => {
    let p = reducer(DEFAULT_PARAMS, { type: "resize", by: { width: 100 }, src });
    p = reducer(p, { type: "rotate", dir: 1 });
    expect(p.rotate).toBe(90);
    expect(p.resize).toEqual({ width: 50, height: 100 });
    p = reducer(p, { type: "rotate", dir: -1 });
    p = reducer(p, { type: "rotate", dir: -1 });
    expect(p.rotate).toBe(270);
    p = reducer(p, { type: "crop", crop: { x: 0, y: 0, w: 0.5, h: 0.5 } });
    expect(p.resize).toBeNull();
  });

  it("초기화와 필터 여부", () => {
    const p = reducer(DEFAULT_PARAMS, { type: "adjust", key: "blur", value: 1 });
    expect(hasFilters(p)).toBe(true);
    expect(reducer(p, { type: "reset" })).toEqual(DEFAULT_PARAMS);
    expect(hasFilters(DEFAULT_PARAMS)).toBe(false);
  });
});

describe("필터", () => {
  const base = { brightness: 100, contrast: 100, saturate: 100, grayscale: 0 };

  it("기본값이면 변화 없음", () => {
    const img = solid(2, 2, [10, 120, 250, 255]);
    adjustColors(img, base);
    expect(px(img, 0, 0)).toEqual([10, 120, 250, 255]);
  });

  it("밝기 0 → 검정, 대비 0 → 회색, 밝기 200 → 2배(최대 255)", () => {
    const a = solid(1, 1, [10, 120, 250, 255]);
    adjustColors(a, { ...base, brightness: 0 });
    expect(px(a, 0, 0)).toEqual([0, 0, 0, 255]);
    const b = solid(1, 1, [10, 120, 250, 255]);
    adjustColors(b, { ...base, contrast: 0 });
    expect(px(b, 0, 0)).toEqual([128, 128, 128, 255]);
    const c = solid(1, 1, [10, 120, 250, 255]);
    adjustColors(c, { ...base, brightness: 200 });
    expect(px(c, 0, 0)).toEqual([20, 240, 255, 255]);
  });

  it("흑백 100 과 채도 0 은 같은 결과이고 세 채널이 같다", () => {
    const a = solid(1, 1, [200, 40, 90, 255]);
    adjustColors(a, { ...base, grayscale: 100 });
    const b = solid(1, 1, [200, 40, 90, 255]);
    adjustColors(b, { ...base, saturate: 0 });
    expect(px(a, 0, 0)).toEqual(px(b, 0, 0));
    expect(new Set(px(a, 0, 0).slice(0, 3)).size).toBe(1);
  });

  it("블러: 단색은 그대로, 전체 밝기 합은 거의 보존, 경계는 부드러워짐", () => {
    const flat = solid(20, 10, [50, 100, 150, 255]);
    blur(flat, 3);
    expect(px(flat, 7, 5)).toEqual([50, 100, 150, 255]);

    const img = solid(20, 1, [0, 0, 0, 255]);
    for (let x = 10; x < 20; x++) img.data.set([255, 255, 255, 255], x * 4);
    const before = img.data.reduce((s, v) => s + v, 0);
    blur(img, 2);
    const after = img.data.reduce((s, v) => s + v, 0);
    expect(Math.abs(after - before) / before).toBeLessThan(0.01);
    const edge = px(img, 9, 0)[0]!;
    expect(edge).toBeGreaterThan(0);
    expect(edge).toBeLessThan(255);
  });

  it("블러: 투명 영역 옆이 검게 번지지 않음", () => {
    const img = solid(10, 1, [0, 0, 0, 0]);
    for (let x = 5; x < 10; x++) img.data.set([255, 0, 0, 255], x * 4);
    blur(img, 2);
    const [r, g, b, a] = px(img, 5, 0);
    expect(a).toBeLessThan(255);
    expect([r, g, b]).toEqual([255, 0, 0]);
  });

  it("픽셀화: 블록 안은 평균 색 한 가지", () => {
    const img = solid(4, 4, [0, 0, 0, 255]);
    img.data.set([255, 255, 255, 255], 0);
    pixelate(img, 2);
    expect(px(img, 0, 0)).toEqual(px(img, 1, 1));
    expect(px(img, 0, 0)[0]).toBe(64);
    expect(px(img, 2, 2)).toEqual([0, 0, 0, 255]);
  });

  it("효과 크기는 짧은 변 대비 % → 미리보기와 원본에서 같은 비율", () => {
    expect(effectPx(1, { width: 4000, height: 3000 })).toBe(30);
    expect(effectPx(1, { width: 400, height: 300 })).toBe(3);
  });
});

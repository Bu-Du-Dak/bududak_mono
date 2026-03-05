import { test, expect } from "@playwright/test";

test.describe("리스트 화면", () => {
  test("리스트 화면 진입 헤더/설명/링크 노출", async ({ page }) => {
    await page.goto("/");

    // H1: Dev Notes
    await expect(
      page.getByRole("heading", { level: 1, name: "Dev Notes" }),
    ).toBeVisible();

    // 설명 문구
    await expect(
      page.getByText("Simple Notes for Complex Ideas by", { exact: true }),
    ).toBeVisible();

    // 링크: BuDuDak (next/link는 role=link로 잡힘)
    const link = page.getByRole("link", { name: "BuDuDak" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "https://bududak.com");
    await expect(link).toHaveAttribute("target", "_blank");

    // 테마 토글 버튼
    const toggle = page.getByRole("button", {
      name: /다크 모드|라이트 모드/,
    });

    await expect(toggle).toBeVisible();

    // 클릭 동작 확인
    await toggle.click();
  });

  test("카테고리 클릭 시 /category/... 이동 후 글 목록 노출", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByText("Categories")).toBeVisible();

    const category = page.getByRole("link", { name: "데이터베이스시스템" });
    await expect(category).toBeVisible();

    await category.click();

    await expect(page).toHaveURL(/\/category\//);

    await expect(page.getByRole("heading", { level: 3 }).first()).toBeVisible();
  });

  test("첫번째 글 클릭 → 글 상세페이지 진입", async ({ page }) => {
    await page.goto("/");

    const firstPostHeading = page.getByRole("heading", { level: 3 }).first();
    await expect(firstPostHeading).toBeVisible();

    const firstPostLink = firstPostHeading.locator("a").first();
    await expect(firstPostLink).toBeVisible();

    const title = (await firstPostLink.innerText()).trim();
    await firstPostLink.click();

    await expect(
      page.getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/\/$/);
  });
});

import { test, expect } from "@playwright/test";

test.describe("글 상세 화면", () => {
  test("글 목차(PostNav) 버튼 클릭 시 해당 섹션으로 스크롤", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.goto("/processorsAndDataProcessing");

    await expect(page.locator("article")).toBeVisible();

    const nav = page.getByRole("navigation", { name: "글 목차" });
    await expect(nav).toBeVisible();

    const firstBtn = nav.locator("button").first();
    await expect(firstBtn).toBeVisible();

    const tocText = (await firstBtn.innerText()).trim();

    const beforeY = await page.evaluate(() => window.scrollY);

    await firstBtn.click();

    await page.waitForTimeout(400);

    await expect
      .poll(async () => {
        return await page.evaluate(() => window.scrollY);
      })
      .not.toBe(beforeY);

    const targetHeading = page
      .locator("article")
      .locator("h2,h3,h4", { hasText: tocText })
      .first();
    await expect(targetHeading).toBeVisible();
  });
});

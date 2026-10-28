import { execSync } from "node:child_process";
import { confirm } from "@inquirer/prompts";

export async function runTest({
  message = "테스트(pnpm run test)를 실행할까요?",
  defaultValue = true,
} = {}) {
  const doTest = await confirm({
    message,
    default: defaultValue,
  });

  if (!doTest) {
    console.log("⚠️  테스트를 건너뜁니다.");
    return;
  }

  console.log("➡️  테스트 실행 중... (pnpm run test)");

  try {
    execSync("pnpm run test", { stdio: "inherit" });
    console.log("✅ 테스트 통과");
  } catch {
    console.error("\n❌ 테스트 실패\n");
    process.exit(1);
  }
}

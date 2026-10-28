import { execSync } from "node:child_process";
import { API_BASE, authHeaders, OWNER_NAME, REPO_NAME } from "../config.mjs";
import { input as inputPrompt, confirm } from "@inquirer/prompts";
import { sh } from "../utils.mjs";
import { runTest } from "./runTest.mjs";

const URL = `${API_BASE}/repos/${OWNER_NAME}/${REPO_NAME}`;

function ensureBranchExists(branch) {
  sh(
    `git show-ref --verify --quiet refs/heads/${branch} || git fetch origin ${branch}:${branch}`,
  );
}

function checkout(branch) {
  sh(`git checkout ${branch}`);
}

function pull(branch) {
  sh(`git pull --ff-only origin ${branch}`);
}

function ensurePushed(branch) {
  try {
    sh(`git rev-parse --abbrev-ref ${branch}@{upstream}`);
    execSync(`git push`, { stdio: "inherit" });
  } catch {
    execSync(`git push -u origin "${branch}"`, { stdio: "inherit" });
  }
}

async function findExistingPR({ head, base }) {
  const res = await fetch(
    `${URL}/pulls?state=open&base=${encodeURIComponent(base)}&head=${encodeURIComponent(
      `${OWNER_NAME}:${head}`,
    )}`,
    { headers: authHeaders },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) && data.length ? data[0] : null;
}

async function createPR({ head, base, title, body }) {
  const res = await fetch(`${URL}/pulls`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ head, base, title, body }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `PR create failed: ${res.status} ${res.statusText} ${JSON.stringify(data)}`,
    );
  }
  return data;
}

function openInBrowser(url) {
  try {
    const opener =
      process.platform === "darwin"
        ? "open"
        : process.platform === "win32"
          ? "start"
          : "xdg-open";
    execSync(`${opener} ${url}`);
  } catch {}
}

function defaultTitle(base, head) {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `Release: ${head} → ${base} (${yyyy}-${mm}-${dd})`;
}

function defaultBody(base, head) {
  return [`Automated PR to merge \`${head}\` into \`${base}\`.`].join("\n");
}

async function main() {
  const head = "develop";
  const base = "main";

  // 로컬에 브랜치 없으면 가져오고 최신화
  ensureBranchExists(head);
  ensureBranchExists(base);

  // develop 최신화 + 필요하면 push
  checkout(head);
  pull(head);

  await runTest({
    message: "prod PR 생성 전 테스트(pnpm run test)를 실행할까요?",
    defaultValue: true,
  });

  const doPush = await confirm({
    message: `PR 생성 전에 ${head} 브랜치를 origin에 push 할까요?`,
    default: true,
  });
  if (doPush) ensurePushed(head);

  // 이미 열려있는 develop->main PR이 있으면 그걸 재사용
  const existing = await findExistingPR({ head, base });
  if (existing) {
    console.log(
      `✅ 이미 열린 PR이 있어요: ${existing.html_url} (#${existing.number})`,
    );
    openInBrowser(existing.html_url);
    return;
  }

  // 제목/본문 입력
  const title = await inputPrompt({
    message: "PR 제목을 입력하세요",
    default: defaultTitle(base, head),
  });

  const body = await inputPrompt({
    message: "PR 본문(간단히). 비워도 됨",
    default: defaultBody(base, head),
  });

  console.log(`➡️  PR 생성 중 (head=${head} → base=${base})...`);
  const pr = await createPR({ head, base, title, body });
  console.log(`✅ PR 생성 완료: ${pr.html_url} (#${pr.number})`);

  openInBrowser(pr.html_url);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

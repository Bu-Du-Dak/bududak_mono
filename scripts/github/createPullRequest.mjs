import { execSync } from "node:child_process";
import { API_BASE, authHeaders, OWNER_NAME, REPO_NAME } from "../config.mjs";
import { input as inputPrompt, confirm } from "@inquirer/prompts";
import { getDefaultBranch, sh } from "../utils.mjs";

const URL = `${API_BASE}/repos/${OWNER_NAME}/${REPO_NAME}`;

function currentBranch() {
  return sh("git rev-parse --abbrev-ref HEAD");
}

function ensurePushed(branch) {
  try {
    sh(`git rev-parse --abbrev-ref ${branch}@{upstream}`);
    execSync(`git push`, { stdio: "inherit" });
  } catch {
    execSync(`git push -u origin "${branch}"`, { stdio: "inherit" });
  }
}
async function fetchIssueTitle(issueNumber) {
  const res = await fetch(`${URL}/issues/${issueNumber}`, {
    headers: authHeaders,
  });
  if (!res.ok) return null; // 못 가져오면 브랜치명으로 fallback
  const data = await res.json();
  return data.title ?? null;
}

function parseIssueNumberFromBranch(branch) {
  const m = branch.match(/(?:-|#)(\d+)$/);
  return m ? Number(m[1]) : null;
}

async function createPR({ head, base, title, issueNumber }) {
  const url = `${URL}/pulls`;
  const body = {
    title,
    head, // 현재 브랜치
    base, // 기본 브랜치
    body: issueNumber ? `Closes #${issueNumber}` : "",
  };
  const res = await fetch(url, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(
      `PR create failed: ${res.status} ${res.statusText} ${JSON.stringify(data)}`
    );
  return data;
}

async function main() {
  const head = currentBranch();
  const base = await getDefaultBranch();

  // 브랜치 끝의 -숫자/#숫자에서 이슈번호 추출
  let issueNumber = parseIssueNumberFromBranch(head);

  // 이슈 제목 선조회 (있으면 사용)
  let suggestedTitle = null;
  if (issueNumber) {
    suggestedTitle = await fetchIssueTitle(issueNumber);
  }

  // 기본 PR 제목: 이슈 제목 → 브랜치명
  const title = await inputPrompt({
    message: "PR 제목을 입력하세요",
    default: suggestedTitle || head,
  });
  // 브랜치명 끝의 -숫자에서 이슈번호 추출 시도, 실패하면 물어보기
  // let issueNumber = parseIssueNumberFromBranch(head);
  if (!issueNumber) {
    const raw = await inputPrompt({
      message: "연결할 이슈 번호(없으면 엔터)",
      default: "",
    });
    issueNumber = raw ? Number(raw) : null;
  }

  // 푸시 여부 확인 및 보장
  const doPush = await confirm({
    message: "PR 생성 전 현재 브랜치를 push 할까요?",
    default: true,
  });
  if (doPush) ensurePushed(head);

  console.log(`➡️  PR 생성 중 (head=${head} → base=${base})...`);
  const pr = await createPR({ head, base, title, issueNumber });
  console.log(`✅ PR 생성 완료: ${pr.html_url} (#${pr.number})`);

  // 브라우저 열기
  try {
    const opener =
      process.platform === "darwin"
        ? "open"
        : process.platform === "win32"
          ? "start"
          : "xdg-open";
    execSync(`${opener} ${pr.html_url}`);
  } catch {}
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

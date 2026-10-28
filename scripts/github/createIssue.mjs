import dotenv from 'dotenv';
import { createInterface } from 'node:readline/promises';
import { execSync } from 'node:child_process';
import { stdin as input, stdout as output } from 'node:process';
import { API_BASE, authHeaders, GIT_TOKEN, OWNER_NAME, REPO_NAME } from '../config.mjs';
import { promptTitle, promptType } from '../prompts.mjs';

dotenv.config();

const URL = `${API_BASE}/repos/${OWNER_NAME}/${REPO_NAME}/issues`;

const usageAndExit = (message) => {
  if (message) console.error('Error->', message);
  process.exit(message ? 1 : 0);
};

if (!GIT_TOKEN || !OWNER_NAME || !REPO_NAME) {
  usageAndExit('환경변수를 확인해주세요.');
}

const rl = createInterface({ input, output });

async function createIssue({ type, title }) {
  const payload = {
    title: `${type}: ${title}`,
    labels: [type === 'feat' ? 'enhancement' : type],
  };

  async function post(bodyObj) {
    const res = await fetch(URL, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(bodyObj),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    return { ok: res.ok, status: res.status, statusText: res.statusText, data };
  }

  let resp = await post(payload);

  if (!resp.ok && resp.status === 422) {
    delete payload.labels;
    resp = await post(payload);
  }

  if (!resp.ok) {
    console.error('[GitHub API Error]', resp.status, resp.statusText);
    console.error(resp.data);
    process.exit(1);
  }

  return resp.data;
}

function createAndSwitchBranch(issueNumber) {
  const branch = `issue-#${issueNumber}`;
  execSync(`git checkout -b "${branch}"`, { stdio: 'inherit' });
  return branch;
}

async function main() {
  const type = await promptType();
  const title = await promptTitle();

  console.log('\n➡️  GitHub 이슈 생성 중...');
  const issue = await createIssue({ type, title });

  console.log(`✅ 이슈 생성 완료: ${issue.html_url} (#${issue.number})`);

  console.log('➡️  브랜치 생성 및 이동 중...');
  const branch = createAndSwitchBranch(issue.number);
  console.log(`✅ 현재 브랜치: ${branch}`);

  await rl.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

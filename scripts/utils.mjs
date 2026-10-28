import { execSync } from 'node:child_process';
import { API_BASE, DEFAULT_BRANCH_NAME } from './config.mjs';

export function sh(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'inherit'], ...opts }).trim();
}

export function kebab(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-_]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function githubFetch(url, init) {
  const res = await fetch(url, init);
  const txt = await res.text();
  let data;
  try {
    data = JSON.parse(txt);
  } catch {
    data = txt;
  }
  return { ok: res.ok, status: res.status, statusText: res.statusText, data };
}

export async function getDefaultBranch() {
  if (DEFAULT_BRANCH_NAME) return DEFAULT_BRANCH_NAME;

  try {
    const res = await fetch(`${API_BASE}/repos/${OWNER_NAME}/${REPO_NAME}`, {
      headers: authHeaders,
    });
    if (res.ok) {
      const repo = await res.json();
      if (repo?.default_branch) return repo.default_branch;
    } else {
      // 디버깅용 경고(원하면 제거)
      const t = await res.text();
      console.warn('[getDefaultBranch] API failed:', res.status, res.statusText, t);
    }
  } catch (e) {
    console.warn('[getDefaultBranch] API error:', e.message);
  }

  try {
    const ref = sh('git symbolic-ref refs/remotes/origin/HEAD'); // ex) refs/remotes/origin/develop
    const m = ref.match(/origin\/(.+)$/);
    if (m) return m[1];
  } catch {}

  // 3) 최종 폴백
  return 'main';
}

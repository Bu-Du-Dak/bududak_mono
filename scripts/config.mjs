import dotenv from 'dotenv';
dotenv.config();

const {
  GIT_ACCESS_TOKEN,
  OWNER,
  REPO,
  GITHUB_API_BASE = 'https://api.github.com',
  DEFAULT_BRANCH,
} = process.env;

export function checkEnv() {
  if (!GIT_ACCESS_TOKEN || !OWNER || !REPO) {
    throw new Error('환경변수를 확인해주세요.');
  }
}

export const API_BASE = GITHUB_API_BASE.replace(/\/+$/, '');
export const REPO_API = `${API_BASE}/repos/${OWNER}/${REPO}`;

export const authHeaders = {
  'Content-Type': 'application/json',
  Authorization: `token ${GIT_ACCESS_TOKEN}`,
  'User-Agent': 'issue-script',
};

export const OWNER_NAME = OWNER;
export const REPO_NAME = REPO;
export const GIT_TOKEN = GIT_ACCESS_TOKEN;
export const DEFAULT_BRANCH_NAME = DEFAULT_BRANCH || 'develop';
export const TYPES = ['feat', 'fix', 'bug', 'refactor'];

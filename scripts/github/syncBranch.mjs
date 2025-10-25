import { execSync } from 'node:child_process';
import { confirm } from '@inquirer/prompts';
import { getDefaultBranch, sh } from '../utils.mjs';

function isDirty() {
  try {
    const out = sh('git status --porcelain');
    return out.length > 0;
  } catch {
    return false;
  }
}

async function maybeStash() {
  if (!isDirty()) return false;
  const doStash = await confirm({
    message: "작업 트리에 변경이 있습니다. 임시로 stash 할까요? (나중에 'git stash pop'으로 복원)",
    default: true,
  });
  if (doStash) {
    execSync("git stash push -u -m 'sync: auto-stash'", { stdio: 'inherit' });
  } else {
    console.log('변경을 커밋/스태시하지 않으면 브랜치 전환에 실패할 수 있어요.');
  }
  return doStash;
}

function ensureUpstream(defaultBranch) {
  try {
    sh(`git rev-parse --abbrev-ref ${defaultBranch}@{upstream}`);
  } catch {
    execSync(`git branch --set-upstream-to origin/${defaultBranch} ${defaultBranch}`, {
      stdio: 'inherit',
    });
  }
}

async function main() {
  // 1) 변경사항 처리
  const stashed = await maybeStash();

  // 2) 기본 브랜치 판단
  const base = await getDefaultBranch();
  console.log(`➡️  기본 브랜치 감지: ${base}`);

  // 3) 원격 최신 참조 가져오기
  execSync('git fetch origin --prune', { stdio: 'inherit' });

  // 4) 기본 브랜치로 체크아웃
  execSync(`git checkout ${base}`, { stdio: 'inherit' });

  // 5) upstream 보장 후 fast-forward pull
  ensureUpstream(base);
  execSync(`git pull --ff-only origin ${base}`, { stdio: 'inherit' });
  console.log('✅ 동기화 완료');

  if (stashed) {
    const applyStash = await confirm({
      message: '방금 stash한 변경을 되돌릴까요? (git stash pop)',
      default: false,
    });
    if (applyStash) {
      execSync('git stash pop', { stdio: 'inherit' });
    } else {
      console.log("나중에 수동으로 'git stash list' / 'git stash pop'을 사용하세요.");
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { select, input as inputPrompt, confirm } from '@inquirer/prompts';
import { TYPES } from './config.mjs';

export async function promptType() {
  return await select({
    message: '이슈 타입을 선택하세요',
    choices: TYPES.map((t) => ({ name: t, value: t })),
    pageSize: 4,
  });
}

export async function promptTitle() {
  const title = await inputPrompt({ message: '이슈 제목을 입력하세요' });
  if (!title?.trim()) return promptTitle();
  return title.trim();
}

export async function promptCreatePR() {
  return await confirm({ message: '바로 Pull Request를 생성할까요?', default: true });
}

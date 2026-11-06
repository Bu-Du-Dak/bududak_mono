import { List, ListItem } from "@repo/ui/components/List";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import {
  ChipsWrapper,
  ResumeDescriptionContainer,
  ResumeDescriptionItem,
} from "../commons/commons";
import { Chip } from "@repo/ui/components/Chip";
import { PERSONAL_PROJECT_STACKS } from "../../constants";
import Anchor from "@repo/ui/typography/Anchor";

export default function PersonalProject() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Anchor
          href="https://github.com/Bu-Du-Dak/bududak_mono"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>bududak_mono</Heading>
        </Anchor>
        <Paragraph>
          이력서·포트폴리오·블로그 3개 앱이 공통 UI와 설정을 공유하는 Turborepo
          모노레포입니다.
        </Paragraph>
        <List>
          <ListItem>
            3개 Next.js 앱이 공통 UI·ESLint·TypeScript 설정 패키지를 공유하도록
            구성했습니다.
          </ListItem>
          <ListItem>
            공통 UI 단위 테스트 24개(테스트 대상 기준 라인 커버리지 97.7%)와
            Playwright E2E로 블로그 주요 흐름을 검증합니다.
          </ListItem>
          <ListItem>
            이슈 → 브랜치 → PR 생성을 스크립트로 자동화하고, PR을 만들기 전에
            테스트를 실행합니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {PERSONAL_PROJECT_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
    </ResumeDescriptionContainer>
  );
}

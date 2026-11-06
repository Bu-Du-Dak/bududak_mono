import { List, ListItem } from "@repo/ui/components/List";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import {
  ChipsWrapper,
  ResumeDescriptionContainer,
  ResumeDescriptionItem,
} from "../commons/commons";
import { Chip } from "@repo/ui/components/Chip";
import { CODE_EDITOR_STACKS, DING_CO_STACKS } from "../../constants";
import Anchor from "@repo/ui/typography/Anchor";

export default function CodeCamp() {
  return (
    <ResumeDescriptionContainer>
      <ResumeDescriptionItem>
        <Anchor
          href="https://portfolio.bududak.com/collaborative-code-editor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>실시간 협업 코딩 에디터</Heading>
        </Anchor>
        <Paragraph>
          멘토와 수강생이 같은 코드를 보며 문제를 푸는 협업 에디터를 단독으로
          개발해 상용화했습니다. (2022.11 ~ 2023.03)
        </Paragraph>
        <List>
          <ListItem>
            설계 판단: 한 달 일정에서 OT·CRDT는 서버 상태 관리와 충돌 해결 비용이
            커서 200ms 소프트 락 방식을 선택했습니다. 입력 중에는 상대 입력에
            throttle을 걸고 편집 중인 사용자를 표시했습니다.
          </ListItem>
          <ListItem>
            동기화 루프 해결: 받은 변경과 사용자 입력을 구분해 재전송 무한
            루프를 제거하고, debounce로 전송 빈도를 조절했습니다.
          </ListItem>
          <ListItem>
            서비스 간 보안 연동: 진입 파라미터(문제·유저·방 ID, 토큰)를 AES로
            암호화해 전달했습니다.
          </ListItem>
          <ListItem>
            결과: 한 달 만에 자사 교육 과정에 적용하고 외부 교육 서비스에
            판매했습니다.
          </ListItem>
        </List>
        <ChipsWrapper>
          {CODE_EDITOR_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
      <ResumeDescriptionItem>
        <Anchor
          href="https://portfolio.bududak.com/online-learning-platform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading level={3}>강의 플랫폼·커뮤니티·백오피스</Heading>
        </Anchor>
        <Paragraph>
          오프라인 코딩 부트캠프를 온라인으로 확장한 강의 플랫폼과 커뮤니티,
          운영자 백오피스를 개발했습니다. (2021.10 ~ 2023.01)
        </Paragraph>
        <List>
          <ListItem>
            소셜 로그인과 토큰 재발급, 아임포트 결제(웹·모바일), 커뮤니티 기능을
            개발했습니다.
          </ListItem>
          <ListItem>
            해외 접속자 타임존 오류와 Apollo 캐시로 인한 데이터 갱신 문제를
            해결했습니다.
          </ListItem>
          <ListItem>
            강의별·전체 노트 검색, 첨삭 일정 확인, 운영자 수강시간 관리 기능을
            개발하고 강의 자료 이미지 처리 오류를 수정했습니다.
          </ListItem>
          <ListItem>Jenkins·Docker로 개발·운영 배포를 자동화했습니다.</ListItem>
        </List>
        <ChipsWrapper>
          {DING_CO_STACKS.map((label) => (
            <Chip key={label}>{label}</Chip>
          ))}
        </ChipsWrapper>
      </ResumeDescriptionItem>
    </ResumeDescriptionContainer>
  );
}

import FlipProfile from "@repo/ui/components/FlipProfile";
import Paragraph from "@repo/ui/typography/Paragraph";
import styled from "styled-components";
export default function ProfileContents() {
  return (
    <Container>
      <FlipProfile frontSrc="/cartoonProfile.png" backSrc="/profile.jpg" />
      <Intro>
        개발자로서 기술보다 사용자에게 전달되는 경험의 완성도를 중요하게
        생각합니다.
        <br />
        복잡한 요구사항을 구조화해 책임 있는 선택으로 더 나은 서비스를 만들고,
        <br />
        팀과 함께 성장하는 개발자가 되고자 합니다.
      </Intro>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3.2rem;
  div {
    flex-shrink: 0;
  }
`;
const Intro = styled(Paragraph)`
  line-height: 3rem;
`;

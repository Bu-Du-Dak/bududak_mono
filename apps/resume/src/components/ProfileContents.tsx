import FlipProfile from "@repo/ui/components/FlipProfile";
import Paragraph from "@repo/ui/typography/Paragraph";
import styled from "styled-components";
export default function ProfileContents() {
  return (
    <Container>
      <FlipProfile frontSrc="/cartoonProfile.png" backSrc="/profile.jpg" />
      <Intro>
        저저저저저저저 으으으으으으으 느느느느느는 이이잉 럴러러러
        삿사사삿람마마맘 임미미밈니니니니다다다
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
  max-width: 43rem;
  line-height: 2.5rem;
`;

import FlipProfile from "@repo/ui/components/FlipProfile";
import Paragraph from "@repo/ui/typography/Paragraph";
import styled from "styled-components";
export default function ProfileContents() {
  return (
    <Container>
      <FlipProfile
        frontSrc="/cartoonProfile.png"
        backSrc="/profile.jpg"
        altFront="홍재훈 프로필 일러스트"
        altBack="홍재훈 프로필 사진"
      />
      <Intro>
        건물 에너지·탄소관리 B2B SaaS와 에듀테크 플랫폼을 만들어 온 5년 차
        프론트엔드 개발자입니다.
        <br />
        현재 EAN테크놀로지에서 프론트엔드 리드를 맡아 실시간 협업 에디터,
        데이터 시각화 화면, 성능 개선을 주도해 왔습니다.
        <br />
        필요하면 백엔드까지 직접 설계하며 팀과 함께 더 나은 서비스를 만들고자
        합니다.
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

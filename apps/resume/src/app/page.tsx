"use client";
import SectionWithTitle from "../components/SectionWithTitle";
import ResumeContents from "../components/ResumeContents";
import styled from "styled-components";
import CodeCamp from "../components/codecamp/CodeCamp";

export default function Home() {
  return (
    <Container>
      <SectionWithTitle title={"test"}>
        <ResumeContents
          title="코드캠프"
          subTitle="프론트엔드 개발자"
          duration={"2022.01~2023.01"}
          description="수강뭐시기뭐뭐뭐무머ㅜ머뭐뭐뭐무머무머ㅜ머"
          listComponent={<CodeCamp />}
        />
        <ResumeContents
          title="코드캠프"
          subTitle="프론트엔드 개발자"
          duration={"2022.01~2023.01"}
          description="수강뭐시기뭐뭐뭐무머ㅜ머뭐뭐뭐무머무머ㅜ머"
        />
      </SectionWithTitle>
      <SectionWithTitle title={"test"}>
        <ResumeContents
          title="코드캠프"
          subTitle="프론트엔드 개발자"
          duration={"2022.01~2023.01"}
          description="수강뭐시기뭐뭐뭐무머ㅜ머뭐뭐뭐무머무머ㅜ머"
        />
        <ResumeContents
          title="코드캠프"
          subTitle="프론트엔드 개발자"
          duration={"2022.01~2023.01"}
          description="수강뭐시기뭐뭐뭐무머ㅜ머뭐뭐뭐무머무머ㅜ머"
        />
      </SectionWithTitle>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding: 4rem 0;
`;

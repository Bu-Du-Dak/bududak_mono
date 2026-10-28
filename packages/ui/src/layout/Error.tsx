"use client";
import styled from "styled-components";
import Heading from "../typography/Heading";
import Paragraph from "../typography/Paragraph";

export default function Error() {
  return (
    <Wrapper>
      <Heading>문제가 발생했습니다.</Heading>
      <Paragraph>잠시 후 다시 시도해주세요.</Paragraph>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 50rem;
`;

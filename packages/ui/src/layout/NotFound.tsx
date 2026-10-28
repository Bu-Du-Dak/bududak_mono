"use client";
import styled from "styled-components";
import Heading from "../typography/Heading";
import Paragraph from "../typography/Paragraph";
import Button from "../components/Button";

export default function NotFound({
  onClickButton,
}: {
  onClickButton?: VoidFunction;
}) {
  const handleClick = () => {
    if (onClickButton) {
      onClickButton();
      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };
  return (
    <Wrapper>
      <Heading>404</Heading>
      <Paragraph>페이지를 찾을 수 없습니다.</Paragraph>
      <Button onClick={handleClick}>돌아가기</Button>
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

"use client";
import styled from "styled-components";
import ListSection from "../components/list/ListSection";
import { REABLE_HOMEPAGE_STACKS, SAVEE_STACKS } from "../constants";

export default function Home() {
  return (
    <Container>
      <ListSection
        title="Next.js"
        description="Next 기반"
        items={[
          {
            id: "test",
            title: "내가만든 프로젝트 01",
            description:
              "이거는 이런이런 생각을 가지고 이러면 좋겠다 해서 이렇게 만들어보자 해서 이렇게 만들게된 프로젝트입니다.",
            imgUrl: "/test01.jpg",
            tags: REABLE_HOMEPAGE_STACKS,
          },
          {
            id: "test2",
            title: "내가만든 프로젝트 02",
            description:
              "이거는 이런이런 생각을 가지고 이러면 좋겠다 해서 이렇게 만들어보자 해서 이렇게 만들게된 프로젝트입니다.",
            imgUrl: "/test02.jpg",
            tags: SAVEE_STACKS,
          },
          {
            id: "test3",
            title: "qwe",
            description: "agsags",
            imgUrl: "/test02.jpg",
            tags: ["Next.js", "TypeScript"],
          },
        ]}
      />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding: 4rem 0;
`;

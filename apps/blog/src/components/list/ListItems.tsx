"use client";
import Heading from "@repo/ui/typography/Heading";
import Link from "next/link";
import styled from "styled-components";
import { PostMeta } from "../../lib/posts";

// 카테고리 스타일 따로 테이블만들까
export default function ListItems({ posts }: { posts: PostMeta[] }) {
  return (
    <Wrapper>
      {posts.map((post) => (
        <Item key={post.slug}>
          <Heading level={3}>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </Heading>
          <Info>{post.category}</Info>
          <Info>{post.date}</Info>
        </Item>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  min-height: 50rem;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const Info = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  /* color:${({ theme }) => theme.colors.secondary} */
`;

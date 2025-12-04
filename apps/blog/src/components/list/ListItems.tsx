"use client";
import Heading from "@repo/ui/typography/Heading";
import Link from "next/link";
import styled from "styled-components";
import { PostMeta } from "../../lib/posts";
import { Chip } from "@repo/ui/components/Chip";

export default function ListItems({ posts }: { posts: PostMeta[] }) {
  return (
    <Wrapper>
      {posts.map((post) => (
        <Item key={post.slug}>
          <Title>
            <Chip>{post.category}</Chip>
            <Heading level={3}>
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </Heading>
          </Title>
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
  a {
    display: inline-block;
    max-width: 100%;
    word-break: break-all;
    overflow-wrap: break-word;
  }
  a:hover {
    opacity: 0.9;
    text-decoration: underline;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.border};
`;

"use client";
import styled from "styled-components";
import { PostData } from "../lib/posts";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import { Chip } from "@repo/ui/components/Chip";

export default function PostContents({ post }: { post: PostData }) {
  return (
    <Article>
      <Chip>{post.category}</Chip>
      <Title level={1}>{post.title}</Title>
      <Date>{post.date}</Date>
      <Contents dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </Article>
  );
}
const Article = styled.article`
  max-width: 100%;
  margin: 0 auto;
`;
const Title = styled(Heading)`
  max-width: 100%;
`;
const Date = styled(Paragraph)`
  margin: 1.6rem 0;
  color: ${({ theme }) => theme.colors.border};
`;
const Contents = styled.section`
  line-height: 1.7rem;
`;

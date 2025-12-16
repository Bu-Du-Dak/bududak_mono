"use client";
import styled from "styled-components";
import { PostData } from "../../lib/posts";

export default function PostContents({ post }: { post: PostData }) {
  return (
    <Article>
      <Contents dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </Article>
  );
}
const Article = styled.article`
  max-width: 65rem;
  width: 100%;
  margin: 0 auto;
`;
const Contents = styled.section`
  line-height: 2.5rem;
  padding: 2rem 0 10rem 0;
  h2,
  h3,
  h4,
  h5 {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    padding: 1rem 0;
  }
  h2 {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
  h3 {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }
  p {
    word-break: keep-all;
    overflow-wrap: break-word;
  }
  img {
    display: block;
    width: auto;
    height: auto;
    max-width: min(50rem, 100%);
    margin: 1rem auto;
  }
`;

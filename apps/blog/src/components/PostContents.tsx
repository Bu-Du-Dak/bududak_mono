"use client";
import styled from "styled-components";
import { PostData } from "../lib/posts";

export default function PostContents({ post }: { post: PostData }) {
  return (
    <Article>
      <Contents dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </Article>
  );
}
const Article = styled.article`
  max-width: 100%;
`;
const Contents = styled.section`
  line-height: 1.7rem;
  padding: 2rem 0 10rem 0;
  p {
    word-break: break-all;
    overflow-wrap: break-word;
  }
`;

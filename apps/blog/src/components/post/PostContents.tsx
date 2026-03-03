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
  padding-bottom: 40vh;
`;

const Contents = styled.section`
  padding: 2.4rem 0 12rem;
  line-height: 1.8;
  word-break: keep-all;
  overflow-wrap: break-word;

  & > * {
    scroll-margin-top: 8rem;
  }

  p {
    margin: 1.2rem 0;
  }

  h2,
  h3,
  h4 {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    line-height: 1.35;
    margin: 4.2rem 0 1.2rem;
    padding: 0;
  }

  h2 {
    font-size: 2.6rem;
  }
  h3 {
    font-size: 2.2rem;
    margin-top: 3.2rem;
  }
  h4 {
    font-size: 1.9rem;
    margin-top: 2.6rem;
  }

  h2:first-child,
  h3:first-child,
  h4:first-child {
    margin-top: 0;
  }

  hr {
    border: 0;
    border-top: ${({ theme }) => `1px solid ${theme.colors.border}`};
    margin: 4.8rem 0;
    opacity: 0.9;
  }

  ul,
  ol {
    list-style: none;
    padding-left: 0;
    margin: 1.2rem 0 1.6rem;
  }

  li {
    position: relative;
    padding-left: 1.8rem;
    margin: 0.6rem 0;
  }

  li > ul,
  li > ol {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
  }
  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.9rem;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: 0.6;
  }

  code {
    font-size: 0.95em;
    padding: 0.2rem 0.45rem;
    border-radius: 0.6rem;
    background: ${({ theme }) => theme.colors.bg};
    border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  }

  pre {
    margin: 1.8rem 0 2.2rem;
    padding: 1.4rem 1.6rem;
    border-radius: 1.2rem;
    overflow: auto;
    background: ${({ theme }) => theme.colors.bg};
    border: ${({ theme }) => `1px solid ${theme.colors.border}`};
    line-height: 1.6;
  }

  pre code {
    padding: 0;
    border: 0;
    background: transparent;
    font-size: 0.95em;
  }

  blockquote {
    margin: 1.8rem 0;
    padding: 1.2rem 1.4rem;
    border-left: ${({ theme }) => `0.4rem solid ${theme.colors.border}`};
    background: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    opacity: 0.95;
  }

  blockquote p {
    margin: 0.6rem 0;
  }

  a {
    text-decoration: underline;
    text-underline-offset: 0.25rem;
    text-decoration-thickness: 0.12rem;
  }

  img {
    display: block;
    max-width: min(60rem, 100%);
    height: auto;
    margin: 2rem auto;
    border-radius: 1.2rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    overflow: hidden;
    border-radius: 1rem;
    border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  }

  th,
  td {
    padding: 0.9rem 1rem;
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
    text-align: left;
    vertical-align: top;
  }

  thead th {
    background: ${({ theme }) => theme.colors.bg};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }
`;

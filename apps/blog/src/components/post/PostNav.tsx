"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";

type Heading = {
  id: string;
  text: string;
  level: number;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostNav() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // ref scanArea 로 바꿀까
    const article = document.querySelector("article");
    if (!article) return;

    const elements = Array.from(
      article.querySelectorAll("h2, h3, h4"),
      // article.querySelectorAll("h2, h3"),
    ) as HTMLHeadingElement[];

    if (!elements.length) return;

    const collected: Heading[] = elements.map((el) => {
      let id = el.id;

      if (!id) {
        id = slugify(el.textContent || "");
        el.id = id;
      }

      const level = Number(el.tagName[1]);

      return {
        id,
        text: el.textContent || "",
        level,
      };
    });

    setHeadings(collected);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.target as HTMLElement).getBoundingClientRect().top -
              (a.target as HTMLElement).getBoundingClientRect().top,
          );

        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      {
        root: null,
        rootMargin: "0px 0px -85% 0px",
        threshold: 0,
      },
    );

    elements.map((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 25;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (!headings.length) return null;

  return (
    <Nav aria-label="글 목차">
      {/* <ListTitle>목차</ListTitle> */}
      <ul>
        {headings.map((item) => {
          const isActive = item.id === activeId;

          return (
            <Li key={item.id} $level={item.level} $active={isActive}>
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                title={item.text}
              >
                {item.text}
              </button>
            </Li>
          );
        })}
      </ul>
    </Nav>
  );
}

const Nav = styled.nav`
  align-self: flex-start;
  top: 5rem;
  width: 23rem;
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
  position: sticky;
  padding-left: 1.2rem;
  border-left: ${({ theme }) => `0.2rem solid ${theme.colors.border}`};
  flex-shrink: 0;
  ${media.lt("tablet")} {
    display: none;
  }
`;
const ListTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  margin-bottom: 0.8rem;
  opacity: 0.8;
`;
const Li = styled.li<{ $level?: number; $active?: boolean }>`
  margin-bottom: 0.4rem;
  padding-left: ${({ $level }) =>
    $level === 2 ? 0 : $level === 3 ? "1.2rem" : $level === 4 ? "2.4rem" : 0};
  button {
    max-width: 20rem;
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    font-weight: ${({ theme, $active }) =>
      $active
        ? theme.typography.weights.bold
        : theme.typography.weights.regular};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0.2rem 0;
    opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  }
`;

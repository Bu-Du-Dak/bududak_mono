"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

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
      article.querySelectorAll("h2, h3, h4")
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
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );

        if (visible[0]) {
          const target = visible[0].target as HTMLElement;
          setActiveId(target.id);
        }
      },
      {
        root: null, // 윈도우 화면 기준
        rootMargin: "0px 0px -85% 0px", // 화면 상단 15% 내에 타겟이 들어오면 반영 시작
        threshold: [0, 1.0],
      }
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
      <ListTitle>목차</ListTitle>
      <ul>
        {headings.map((item) => {
          const isActive = item.id === activeId;

          return (
            <Li key={item.id} $level={item.level} $active={isActive}>
              <button type="button" onClick={() => handleClick(item.id)}>
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
  overflow-y: auto;
  align-self: flex-start;
  top: 10rem;
  max-height: calc(100vh - 10rem);
  position: sticky;
  padding-left: 1.2rem;
  border-left: ${({ theme }) => `0.2rem solid ${theme.colors.border}`};
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
    max-width: 26rem;
    /* color: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.text}; */
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

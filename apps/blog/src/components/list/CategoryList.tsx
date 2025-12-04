"use client";

import { Chip } from "@repo/ui/components/Chip";
import Paragraph from "@repo/ui/typography/Paragraph";
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";

export default function CategoryList({
  categories,
  selected,
}: {
  categories: Array<string | undefined>;
  selected?: string;
}) {
  const theme = useTheme();
  return (
    <ListWrapper>
      <Title>
        <Paragraph>카테고리</Paragraph>
      </Title>
      <List>
        {categories.map((category) => {
          const isSelected = selected === category;
          const href = isSelected ? "/" : `/category/${category}`;
          return (
            <Item key={category}>
              <Link href={href}>
                <Chip $color={isSelected ? theme.colors.primary : undefined}>
                  {category}
                </Chip>
              </Link>
            </Item>
          );
        })}
      </List>
    </ListWrapper>
  );
}
const ListWrapper = styled.div`
  width: 100%;
  max-width: 18rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: sticky;
  top: 1rem;
  align-self: flex-start;
  ${media.lt("tablet")} {
    position: static;
    max-width: none;
    width: 100%;
  }
`;
const Title = styled.div`
  padding: 1rem 0;
  border-bottom: ${({ theme }) => `0.1rem solid ${theme.colors.border}`};
  margin-bottom: 1.2rem;
  ${media.lt("tablet")} {
    display: none;
  }
`;
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  ${media.lt("tablet")} {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Item = styled.li`
  cursor: pointer;
`;

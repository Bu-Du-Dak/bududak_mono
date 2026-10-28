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
        <Paragraph $fontWeight={theme.typography.weights.bold}>
          Categories
        </Paragraph>
      </Title>
      <List>
        {categories.map((category) => {
          const decodedSelected = selected
            ? decodeURIComponent(selected)
            : undefined;
          const isSelected = decodedSelected === category;
          const href = isSelected
            ? "/"
            : `/category/${encodeURIComponent(category ?? "")}`;

          return (
            <Item key={category}>
              <Link href={href}>
                <HoverChip $selected={isSelected}>{category}</HoverChip>
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
    position: sticky;
    top: 0;
    max-width: none;
    // 전체 좌우 padding 따라 재 설정
    width: calc(100% + 4rem);
    margin-left: -2rem;
    padding-block: 1.2rem;
    padding-inline: 2rem;

    backdrop-filter: blur(0.9rem);
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
const HoverChip = styled(Chip)<{ $selected?: boolean }>`
  color: ${({ theme, $selected }) =>
    $selected ? "white" : theme.colors.textSecondary};
  &:hover {
    border: ${({ theme }) => `0.1rem solid ${theme.colors.primary}`};
    color: ${({ theme }) => theme.colors.text};
  }
`;

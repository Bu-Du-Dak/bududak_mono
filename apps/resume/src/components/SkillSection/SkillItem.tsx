"use client";
import Heading from "@repo/ui/typography/Heading";
import { List, ListItem } from "@repo/ui/components/List";
import styled from "styled-components";
type skillItemProps = {
  title: string;
  itemArr: string[];
};
export default function SkillItem({ title, itemArr }: skillItemProps) {
  return (
    <ItemWrapper>
      <Heading level={3}>{title}</Heading>
      <List>
        {itemArr.map((item, i) => (
          <ListItem key={`${title}${i}`}>{item}</ListItem>
        ))}
      </List>
    </ItemWrapper>
  );
}
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

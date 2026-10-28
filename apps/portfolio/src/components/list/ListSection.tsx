import Heading from "@repo/ui/typography/Heading";
import styled from "styled-components";
import ListItem from "./ListItem";

export type Item = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imgUrl: string;
};
type ListSectionProps = {
  title: string;
  description?: string;
  items: Item[];
};
export default function ListSection({
  title,
  description,
  items,
}: ListSectionProps) {
  return (
    <Container>
      <Heading level={2}>{title}</Heading>
      {description && <Info>{description}</Info>}
      <ListWrapper>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ListWrapper>
    </Container>
  );
}
const Container = styled.section`
  padding: 5rem 0;
`;
const Info = styled.div`
  margin-top: 0.6rem;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
const ListWrapper = styled.ul`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
const Item = styled.li`
  padding: 5rem 0;
`;

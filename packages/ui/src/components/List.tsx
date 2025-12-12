import styled from "styled-components";
type ListProps = React.ComponentProps<typeof Ul>;
type ListItemProps = React.ComponentProps<typeof Li>;

export function List({ children, ...rest }: ListProps) {
  return <Ul {...rest}>{children}</Ul>;
}
export function ListItem({ children, ...rest }: ListItemProps) {
  return <Li {...rest}>{children}</Li>;
}

const Ul = styled.ul`
  padding: 1.2rem 1.6rem;
  list-style-type: disc;
`;
const Li = styled.li`
  margin-bottom: 1rem;
  &::marker {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

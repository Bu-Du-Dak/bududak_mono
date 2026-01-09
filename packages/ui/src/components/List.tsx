import styled from "styled-components";
import { media } from "../styles/breakPoints";
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
  list-style: none;
  /* list-style-type: disc; */
`;
const Li = styled.li`
  word-break: keep-all;
  overflow-wrap: break-word;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  ${media.lt("tablet")} {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
  // 커스텀 마커 테스트
  position: relative;
  &::before {
    /* content: "•"; */
    content: "";
    position: absolute;
    left: -1rem;
    /* top: 0.2rem; */
    top: 1.2rem;
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    color: ${({ theme }) => theme.colors.primary};
    width: 0.5rem;
    height: 0.5rem;

    ${media.lt("tablet")} {
      width: 0.4rem;
      height: 0.4rem;
      top: 1rem;
    }
    border-radius: 15%;
    background: ${({ theme }) => theme.colors.primary};
  }
  /* &::marker {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  } */
`;

import styled from "styled-components";
import { media } from "../styles/breakPoints";

type AnchorProps = React.ComponentProps<typeof StyledAnchor>;

export default function Anchor({ children, ...rest }: AnchorProps) {
  return (
    <StyledAnchor {...rest} target={"_blank"} rel="noopener noreferrer">
      {children}
    </StyledAnchor>
  );
}

const StyledAnchor = styled.a`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.colors.secondary};
  }

  ${media.lt("tablet")} {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
`;

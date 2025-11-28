"use client";
import styled from "styled-components";
import { media } from "../styles/breakPoints";

type ParagraphProps = React.ComponentProps<typeof StyledParagraph>;

export default function Paragraph({ children, ...rest }: ParagraphProps) {
  return <StyledParagraph {...rest}>{children}</StyledParagraph>;
}
const StyledParagraph = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  ${media.lt("tablet")} {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
`;

"use client";
import styled from "styled-components";
import { media } from "../styles/breakPoints";

type ParagraphProps = React.ComponentProps<typeof StyledParagraph>;

export default function Paragraph({ children, ...rest }: ParagraphProps) {
  return (
    <StyledParagraph
      $color={rest.color}
      $fontWeight={rest.$fontWeight}
      {...rest}
    >
      {children}
    </StyledParagraph>
  );
}
const StyledParagraph = styled.p<{
  $color?: string;
  $fontWeight?: string | number;
}>`
  word-break: keep-all;
  overflow-wrap: break-word;
  color: ${({ $color, theme }) => $color ?? theme.colors.text};
  font-weight: ${({ $fontWeight, theme }) =>
    $fontWeight ?? theme.typography.weights.regular};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.6;
  ${media.lt("tablet")} {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
`;

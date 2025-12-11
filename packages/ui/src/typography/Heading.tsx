"use client";
import styled from "styled-components";
import { media } from "../styles/breakPoints";
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type StyledHeadingProps = React.ComponentProps<typeof StyledHeading>;
type HeadingProps = Omit<StyledHeadingProps, "$level"> & {
  level?: HeadingLevel;
};
export default function Heading({ children, level = 1 }: HeadingProps) {
  return (
    <StyledHeading as={`h${level}`} $level={level}>
      {children}
    </StyledHeading>
  );
}
const StyledHeading = styled.h1<{ $level: HeadingLevel }>`
  word-break: break-all;
  overflow-wrap: break-word;
  font-size: ${({ theme, $level }) => {
    switch ($level) {
      case 1:
        return theme.typography.sizes["4xl"];
      case 2:
        return theme.typography.sizes["3xl"];
      case 3:
        return theme.typography.sizes["2xl"];
      default:
        return theme.typography.sizes.xl;
    }
  }};
  line-height: ${({ theme, $level }) => {
    switch ($level) {
      case 1:
        return theme.typography.sizes["4xl"];
      case 2:
        return theme.typography.sizes["3xl"];
      case 3:
        return theme.typography.sizes["2xl"];
      default:
        return theme.typography.sizes.xl;
    }
  }};
  font-weight: ${({ theme, $level }) => {
    switch ($level) {
      case 1:
      case 2:
        return theme.typography.weights.bold;
      case 3:
        return theme.typography.weights.medium;
      default:
        return theme.typography.weights.regular;
    }
  }};
  ${media.lt("tablet")} {
    font-size: ${({ $level }) => {
      switch ($level) {
        case 1:
          return "3.6rem";
        case 2:
          return "3rem";
        case 3:
          return "2rem";
        default:
          return "1.6rem";
      }
    }};
    line-height: ${({ $level }) => {
      switch ($level) {
        case 1:
          return "3.6rem";
        case 2:
          return "3rem";
        case 3:
          return "2rem";
        default:
          return "1.6rem";
      }
    }};
  }
`;

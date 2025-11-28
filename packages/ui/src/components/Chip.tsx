"use client";
import styled from "styled-components";

type ChipProps = React.ComponentProps<typeof CustomChip>;
export default function Chip({ children, ...rest }: ChipProps) {
  return <CustomChip {...rest}>{children}</CustomChip>;
}
const CustomChip = styled.div<{ $color?: string }>`
  width: fit-content;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme, $color }) => ($color ? $color : theme.colors.border)};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border: ${({ theme, $color }) =>
    $color ? `0.1rem solid ${$color}` : `0.1rem solid ${theme.colors.border}`};
`;

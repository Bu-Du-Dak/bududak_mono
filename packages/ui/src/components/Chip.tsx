"use client";
import styled from "styled-components";

type ChipProps = React.ComponentProps<typeof CustomChip>;
export function Chip({ children, color, ...rest }: ChipProps) {
  return (
    <CustomChip $color={color} {...rest}>
      {children}
    </CustomChip>
  );
}
const CustomChip = styled.div<{ $color?: string }>`
  width: fit-content;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme, $color }) => ($color ? $color : theme.colors.border)};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${({ theme, $color }) => $color || theme.colors.border};
`;

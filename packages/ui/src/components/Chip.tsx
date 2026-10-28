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
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme, $color }) =>
    $color ? $color : theme.colors.textSecondary};
  padding: 0.25rem 1rem;
  border-radius: 2rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${({ theme, $color }) => $color || theme.colors.border};
`;

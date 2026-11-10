import styled from "styled-components";

export const Button = styled.button<{ $primary?: boolean; $active?: boolean }>`
  padding: 0.8rem 1.4rem;
  border-radius: 0.6rem;
  border: 0.1rem solid
    ${({ theme, $primary, $active }) => ($primary || $active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $primary }) => ($primary ? theme.colors.primary : "transparent")};
  color: ${({ theme, $primary, $active }) => ($primary ? "#fff" : $active ? theme.colors.primary : theme.colors.text)};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ $primary, $active }) => ($primary || $active ? 700 : 400)};
  white-space: nowrap;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: 0.2rem;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  h3 {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
`;

export const Muted = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

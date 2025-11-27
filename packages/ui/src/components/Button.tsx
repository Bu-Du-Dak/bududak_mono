import styled from "styled-components";

type ButtonProps = React.ComponentProps<typeof CustomButton>;
export default function Button({ children, ...rest }: ButtonProps) {
  return <CustomButton {...rest}>{children}</CustomButton>;
}
const CustomButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  padding: 0.6rem 1.8rem;
  text-align: center;
  border-radius: 0.6rem;
  cursor: pointer;
`;

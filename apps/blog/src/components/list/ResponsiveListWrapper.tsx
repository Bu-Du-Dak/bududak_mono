"use client";
import styled from "styled-components";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";

export default function ResponsiveListWrapper({
  children,
}: React.ComponentProps<typeof Wrapper>) {
  return <Wrapper>{children}</Wrapper>;
}
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  padding: 10rem 0;

  ${media.lt("tablet")} {
    flex-direction: column-reverse;
    gap: 3rem;
    padding: 4rem 0;
    justify-content: flex-start;
  }
`;

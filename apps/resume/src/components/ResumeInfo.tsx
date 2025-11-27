import StickyBox from "@repo/ui/layout/StickyBox";
import styled from "styled-components";
import { media } from "../../../../packages/ui/src/styles/breakPoints";
import Heading from "@repo/ui/typography/Heading";

type InfoPropsType = {
  title: string;
  duration?: string;
  subTitle?: string;
  description?: string;
};
export default function ResumeInfo({
  title,
  duration,
  subTitle,
  description,
}: InfoPropsType) {
  return (
    <StickyBox>
      <Wrapper>
        <Heading level={3}>{title}</Heading>
        <Duration>{duration}</Duration>
        <span>{subTitle}</span>
        <Description>{description}</Description>
      </Wrapper>
    </StickyBox>
  );
}
const Wrapper = styled.div`
  width: 20rem;
  ${media.lt("tablet")} {
    width: 100%;
  }
`;
const Title = styled.h3``;
const Duration = styled.p``;
const Description = styled.p``;

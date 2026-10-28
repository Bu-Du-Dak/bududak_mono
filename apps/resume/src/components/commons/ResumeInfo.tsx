import StickyBox from "@repo/ui/layout/StickyBox";
import styled from "styled-components";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import { dateFormatter } from "../../lib/dateFormatter";

type InfoPropsType = {
  title: string;
  duration?: string;
  subTitle?: string;
  description?: string;
  sticky?: boolean;
};
export default function ResumeInfo({
  title,
  duration,
  subTitle,
  description,
  sticky = true,
}: InfoPropsType) {
  return (
    <StickyBox sticky={sticky}>
      <Wrapper>
        <Heading level={3} style={{ marginBottom: "1rem" }}>
          {title}
        </Heading>
        {duration && (
          <Paragraph>
            <Duration dateTime={dateFormatter(duration)}>{duration}</Duration>
          </Paragraph>
        )}
        <Paragraph style={{ marginBottom: "1rem" }}>{subTitle}</Paragraph>
        <Description>{description}</Description>
      </Wrapper>
    </StickyBox>
  );
}
const Wrapper = styled.div`
  width: 20rem;
  ${media.lt("tablet")} {
    width: 100%;
    padding: 0 0 0 1.6rem;
    border-left: ${({ theme }) => `0.3rem solid ${theme.colors.secondary}`};
  }
`;
const Duration = styled.time`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.tertiary};
  ${media.lt("tablet")} {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }
`;
const Description = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

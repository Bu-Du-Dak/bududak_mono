"use client";
import styled from "styled-components";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";
import ThemeToggle from "@repo/ui/themes/themeToggle";
import Paragraph from "@repo/ui/typography/Paragraph";
import Heading from "@repo/ui/typography/Heading";
import { Chip } from "@repo/ui/components/Chip";
import { PostData } from "../../lib/posts";

import { useRouter } from "next/navigation";

export default function PostHeader({ post }: { post: PostData }) {
  const router = useRouter();
  return (
    <Wrapper>
      <SubTitleWrapper>
        <CustomBackButton type={"button"} onClick={() => router.back()}>
          <span>←</span>
          <Heading level={3}>Dev Notes</Heading>
        </CustomBackButton>

        <ThemeToggle />
      </SubTitleWrapper>

      <Chip>{post.category}</Chip>
      <Title level={1}>{post.title}</Title>
      <Date>{post.date}</Date>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 0 2rem 0;
  ${media.lt("tablet")} {
    padding: 4rem 0 0 0;
  }
`;
const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6rem;
  ${media.lt("tablet")} {
    margin-bottom: 4rem;
  }
`;
const CustomBackButton = styled.button`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  span {
    font-size: 2.5rem;
    font-weight: 700;
  }
`;
const Title = styled(Heading)`
  max-width: 100%;
`;
const Date = styled(Paragraph)`
  margin: 1.6rem 0;
  color: ${({ theme }) => theme.colors.border};
`;

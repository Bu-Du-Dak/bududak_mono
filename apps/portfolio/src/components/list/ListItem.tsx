import styled from "styled-components";
import { Item } from "./ListSection";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import Image from "next/image";
import { Chip } from "@repo/ui/components/Chip";
import Link from "next/link";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";

export default function ListItem({ item }: { item: Item }) {
  return (
    <li>
      <StyledLink href={`/${item.id}`}>
        <ImageWrapper>
          <StyledImage src={item.imgUrl} alt={item.title} fill />
          <Overlay>
            <OverlayTitle level={3}>{item.title}</OverlayTitle>
          </Overlay>
        </ImageWrapper>

        <InfoWrapper>
          <Heading level={3}>{item.title}</Heading>
          <Paragraph>{item.description}</Paragraph>

          <TagsWrapper>
            {item.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </TagsWrapper>
        </InfoWrapper>
      </StyledLink>
    </li>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  gap: 3.2rem;
  border: ${({ theme }) => `0.1rem solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radius};
  padding: 3rem 2rem;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  overflow: hidden;

  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    background-color 0.22s ease;

  &:hover {
    transform: translateY(-0.4rem);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.18);
  }

  &:hover img {
    transform: scale(1.04);
  }

  ${media.lt("tablet")} {
    flex-direction: column;
    padding: 2rem 1.6rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 1.2rem;

  ${media.lt("tablet")} {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  display: none;

  ${media.lt("tablet")} {
    display: flex;
    align-items: flex-end;
    position: absolute;
    inset: 0;
    padding: 1.6rem;

    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));
  }
`;

const OverlayTitle = styled(Heading)`
  color: #fff;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  ${media.lt("tablet")} {
    h3 {
      display: none;
    }
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

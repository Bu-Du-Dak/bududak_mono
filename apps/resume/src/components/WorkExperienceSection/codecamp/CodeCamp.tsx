"use client";
import { List, ListItem } from "@repo/ui/components/List";
import Anchor from "@repo/ui/typography/Anchor";
import Heading from "@repo/ui/typography/Heading";
import Paragraph from "@repo/ui/typography/Paragraph";
import styled from "styled-components";

export default function CodeCamp() {
  return (
    <>
      <DescriptionWrapper>
        <Heading level={3}>asdasd</Heading>
        <Paragraph>cmsakclmasklcmasklcmsaklcmaslkcmasklcmklasmclkasc</Paragraph>
      </DescriptionWrapper>
      <List>
        <ListItem>
          <Paragraph>
            ascsacascascqwcqwcqwcqwcqwcqwcqwcqwxzczxzcxzcxzxc
          </Paragraph>
          <Paragraph>
            ascsacascascqwcqwcqwcqw<Anchor>cqw</Anchor>cqwcqwcqwxzczxzcxzcxzxc
          </Paragraph>
        </ListItem>
        <ListItem>xzczxzcxzcxzxc2</ListItem>
        <ListItem>xzczxzcxzcxzxc3</ListItem>
        <ListItem>xzczxzcxzcxzxc</ListItem>
        <ListItem>xzczxzcxzcxzxc2</ListItem>
        <ListItem>xzczxzcxzcxzxc3</ListItem>
        <ListItem>xzczxzcxzcxzxc</ListItem>
        <ListItem>xzczxzcxzcxzxc2</ListItem>
        <ListItem>xzczxzcxzcxzxc3</ListItem>
        <ListItem>xzczxzcxzcxzxc</ListItem>
        <ListItem>xzczxzcxzcxzxc2</ListItem>
        <ListItem>xzczxzcxzcxzxc3</ListItem>
        <ListItem>xzczxzcxzcxzxc</ListItem>
        <ListItem>xzczxzcxzcxzxc2</ListItem>
        <ListItem>xzczxzcxzcxzxc3</ListItem>
      </List>
    </>
  );
}

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

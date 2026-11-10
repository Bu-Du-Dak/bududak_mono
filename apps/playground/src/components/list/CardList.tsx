"use client";
import styled from "styled-components";
import Card from "./Card";
import { WORKS } from "../../constants/works";
import { media } from "../../../../../packages/ui/src/styles/breakPoints";

export default function CardList() {
  return (
    <Grid>
      {WORKS.map((work) => (
        <Card key={work.id} work={work} />
      ))}
    </Grid>
  );
}

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
  padding: 4rem 0;

  ${media.lt("web")} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.lt("tablet")} {
    grid-template-columns: 1fr;
  }
`;

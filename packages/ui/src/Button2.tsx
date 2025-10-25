"use client";
import styled from "styled-components";

export default function Button2() {
  return <Wrapper onClick={() => console.log("2222")}>asdasdsd</Wrapper>;
}
const Wrapper = styled.div`
  width: 100px;
  height: 50px;
  background-color: red;
`;

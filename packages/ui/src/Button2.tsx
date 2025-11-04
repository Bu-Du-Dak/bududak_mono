"use client";
import styled from "styled-components";

export default function Button2() {
  return <Wrapper onClick={() => console.log("2222")}>asdasdsd</Wrapper>;
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  background-color: red;
`;

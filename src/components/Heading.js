import React from "react";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 70rem;
  margin-left: 1rem;
  color: #002efc;
  text-align: left;
  z-index: 10;
  cursor: pointer;
  transition: filter 0.6s ease-in-out;
  &:hover {
    filter: blur(1.2px);
  }
  @media screen and (max-width: 800px) {
    position: relative;
    margin: 2rem 4rem;
    text-align: center;
  }
`;

const H1 = styled.h1`
  font-family: "CharlevoixPro-Bold", sans-serif;
  margin-bottom: 0.5rem;
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: -3px;
  max-width: 100rem;
  @media screen and (max-width: 800px) {
    font-size: 2rem;
  }
`;
const P1 = styled.p`
  font-family: "ObjectSans-Regular", sans-serif;
  font-size: 0.8rem;
  @media screen and (max-width: 800px) {
    font-size: 0.75rem;
  }
`;

export const Heading = () => {
  return (
    <Header>
      <H1>INFINITE GALLERY</H1>
      <P1>
        An infinitely generating art gallery <br />
        powered by the Art Institute of Chicago
      </P1>
    </Header>
  );
};

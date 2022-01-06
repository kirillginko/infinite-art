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
    filter: blur(1px);
  }
`;

const H1 = styled.h1`
  font-family: "ObjectSans-Regular", sans-serif;
  margin-bottom: 0.5rem;
  font-size: 3rem;
  letter-spacing: -3px;
`;

export const Heading = () => {
  return (
    <Header>
      <H1>INFINITE GALLERY</H1>
      <p>
        An infinitely generating art gallery <br />
        powered by the Art Institute of Chicago
      </p>
      {/* <form>
        <Input type="text" placeholder="Search photos" />
        <Button>Search</Button>
      </form> */}
    </Header>
  );
};

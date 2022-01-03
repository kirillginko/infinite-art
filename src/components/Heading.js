import React from "react";
import styled from "styled-components";

const Header = styled.header`
  max-width: 70rem;
  margin: 2rem auto;
  text-align: center;
`;

const H1 = styled.h1`
  font-family: "Oswald", sans-serif;
  margin-bottom: 0.7rem;
  font-size: 2rem;
`;

export const Heading = () => {
  return (
    <Header>
      <H1>Infinite Art</H1>
      <p>A infinite source of art inspiration</p>
      {/* <form>
        <Input type="text" placeholder="Search photos" />
        <Button>Search</Button>
      </form> */}
    </Header>
  );
};

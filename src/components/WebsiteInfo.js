import React from "react";
import styled from "styled-components";

function WebsiteInfo() {
  return (
    <>
      <Background>
        <H1>
          Created by Kirill Ginko <br /> the Art Institute of Chicago API,
          React, Axios, Firestore, Styled Components, Framer Motion.
        </H1>
      </Background>
    </>
  );
}

const Background = styled.div`
  background-color: #00000063;
  height: 1000vh;
  width: 30vw;
  display: none;
`;
const H1 = styled.h1`
  position: fixed;
  color: limegreen;
  left: 1rem;
  top: 8rem;
  font-size: 0.8rem;
`;

export default WebsiteInfo;

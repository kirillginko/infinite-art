import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Header = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  margin-left: 1rem;
  margin-top: 1rem;
  max-width: 70rem;
  color: #002efc;
  z-index: 10;
  cursor: grab;
  transition: filter 0.6s ease-in-out;
  &:hover {
    filter: blur(1.2px);
  }
  &:active {
    cursor: grabbing;
  }
  @media screen and (max-width: 800px) {
    position: relative;
    margin: 2rem auto;
  }
`;

const H1 = styled(motion.h1)`
  font-family: "ABCMarfa-Light-Trial", sans-serif;
  margin-bottom: 0.8rem;
  font-size: 3.5rem;
  font-weight: 100;
  letter-spacing: -1px;
  @media screen and (max-width: 800px) {
    font-size: 2rem;
    text-align: center;
  }
`;
const P1 = styled(motion.p)`
  font-family: "ObjectSans-Regular", sans-serif;
  font-size: 0.7rem;
  @media screen and (max-width: 800px) {
    font-size: 0.7rem;
    text-align: center;
  }
`;
const Span = styled.span`
  color: Red;
  font-weight: bold;
  @media screen and (max-width: 800px) {
    color: Red;
    font-weight: 100;
  }
`;

export const Heading = () => {
  return (
    <Header
      as={motion.header}
      drag
      dragConstraints={{
        top: -2,
        left: -2,
        right: 1420,
        bottom: 750,
      }}
      dragTransition={{
        min: 0,
        max: 100,
        bounceDamping: 20,
      }}
    >
      <H1
        as={motion.h1}
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: 10, opacity: 1 }}
        transition={{
          ease: "linear",
          delay: 0.5,
          y: { type: "spring", stiffness: 200 },
          default: { duration: 0.5 },
        }}
      >
        INFINITY GALLERY
      </H1>
      <P1 as={motion.p}>
        An infinitely generating art gallery <br />
        powered by The Art Institute of Chicago
      </P1>
    </Header>
  );
};

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

function ArtResults({ id, name, title, image, i }) {
  const source = `https://www.artic.edu/iiif/2/${image}/full/400,/0/default.jpg`;

  return (
    <Card
      as={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={{
        visible: {
          opacity: 1,
          translateX: 50,
        },
        hidden: {
          opacity: 0,
          translateX: -50,
        },
      }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
    >
      {image && (
        <>
          <H1 className="name box">{name}</H1>
          <P className="title box">{title}</P>
          <Img src={source} alt={id} onError={null} />
        </>
      )}
    </Card>
  );
}

const Card = styled(motion.div)`
  margin-right: 4rem;
  text-align: center;
  height: 100%;
  margin-top: 1rem;
  @media screen and (max-width: 800px) {
    /* margin-left: -4rem; */
  }
`;
const H1 = styled.h1`
  font-size: 0.75rem;
  max-width: 25rem;
  @media screen and (max-width: 800px) {
    font-size: 0.8rem;
    margin: 0.5rem;
  }
`;
const P = styled.p`
  font-size: 0.8rem;
  max-width: 25rem;
  margin-top: 0.5rem;
  @media screen and (max-width: 800px) {
    font-size: 0.8rem;
    margin: 0.5rem;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-top: 0.5rem;
`;

export default ArtResults;

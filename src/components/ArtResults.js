import React from "react";
import { motion } from "framer-motion";

function ArtResults({ id, name, title, image, i }) {
  const source = `https://www.artic.edu/iiif/2/${image}/full/400,/0/default.jpg`;

  return (
    <motion.div
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
          <h1 className="name box">{name}</h1>
          <p className="title box">{title}</p>
          <img src={source} alt={id} onError={null} />
        </>
      )}
    </motion.div>
  );
}

export default ArtResults;

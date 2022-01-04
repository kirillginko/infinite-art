import React from "react";
import { motion } from "framer-motion";

function ArtResults({ id, name, title, image, i }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={{
        visible: { opacity: 1, translateX: 50 },
        hidden: { opacity: 0, translateX: -50 },
      }}
      transition={{ duration: 0.3, delay: i * 0.06 }}
    >
      {image && (
        <>
          <h1 className="name box">{name}</h1>
          <p className="title box">{title}</p>
          <img
            src={`https://www.artic.edu/iiif/2/${image}/full/400,/0/default.jpg`}
            alt={id}
            className="box"
          />
        </>
      )}
    </motion.div>
  );
}

export default ArtResults;

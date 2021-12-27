import React, { useState, useEffect } from "react";
import { gsap, Power3, Power4 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ArtResults({ id, name, title, image }) {
  let tl = gsap.timeline({});

  useEffect(() => {
    tl.from(
      ".box",
      { x: -30, opacity: 1, ease: Power3.easeOut, duration: 1, stagger: 0.3 },
      "+=1"
    );
  }, [image]);

  return (
    <div className="card">
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
    </div>
  );
}

export default ArtResults;

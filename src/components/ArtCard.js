import React from "react";

function ArtCard({ id, name, title, image, loading }) {
  return (
    <div className="card">
      <h1 className="name">{name}</h1>
      <p className="title">{title}</p>
      <img
        src={`https://www.artic.edu/iiif/2/${image}/full/400,/0/default.jpg`}
        alt={id}
        className={loading ? "blur" : ""}
      />
    </div>
  );
}

export default ArtCard;

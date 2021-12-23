import React from "react";

function ArtResults({ id, name, title, image, loading }) {
  return (
    <div className="card">
      {image && (
        <>
          <h1 className="name">{name}</h1>
          <p className="title">{title}</p>
          <img
            src={`https://www.artic.edu/iiif/2/${image}/full/400,/0/default.jpg`}
            alt={id}
            className={loading ? "blur" : ""}
          />
        </>
      )}
    </div>
  );
}

export default ArtResults;

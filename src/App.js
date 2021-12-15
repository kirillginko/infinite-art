import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [apiLinks, setApiLinks] = useState({});
  const [artistName, setArtistName] = useState([]);
  const [artTitle, setArtTitle] = useState([]);
  const [imageId, setImageId] = useState([]);
  const imgUrl = `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`;

  useEffect(() => {
    const getArt = async () => {
      try {
        const resp = await axios.get(
          "https://api.artic.edu/api/v1/artworks/111060?fields=id,artist_display,title,image_id"
        );
        // console.log(resp.data.data);
        let name = resp.data.data.artist_display;
        let image = resp.data.data.image_id;
        let title = resp.data.data.title;
        setArtistName(name);
        setArtTitle(title);
        setImageId(image);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    getArt();
  }, []);

  useEffect(() => {
    let apiArrays = [];
    const searchArt = async () => {
      try {
        const res = await axios.get(
          "https://api.artic.edu/api/v1/artworks/search?page=3&limit=10&q=Modern Art?"
        );
        let results = res.data.data;
        let links = results.map((link) => {
          let apis = link.api_link;

          console.log(apis);
        });
      } catch (err) {
        console.log(err);
      }
    };
    searchArt();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <h1 className="title">{artTitle}</h1>
      <h1 className="name">{artistName}</h1>
      <img src={imgUrl} alt="image" />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ArtCard from "./components/ArtCard";
import Loader from "./components/Loader";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll";

function App() {
  const [artResults, setArtResults] = useState([]);
  const [apiLinks, setApiLinks] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const fields = "?fields=id,artist_display,title,image_id";
      const request1 = (await apiLinks[0]) + fields;
      const request2 = (await apiLinks[1]) + fields;
      const request3 = (await apiLinks[2]) + fields;
      const request4 = (await apiLinks[3]) + fields;
      const request5 = (await apiLinks[4]) + fields;
      const request6 = (await apiLinks[5]) + fields;
      const request7 = (await apiLinks[6]) + fields;
      const request8 = (await apiLinks[7]) + fields;
      const request9 = (await apiLinks[8]) + fields;
      const request10 = (await apiLinks[9]) + fields;

      const response1 = await axios.get(request1);
      const response2 = await axios.get(request2);
      const response3 = await axios.get(request3);
      const response4 = await axios.get(request4);
      const response5 = await axios.get(request5);
      const response6 = await axios.get(request6);
      const response7 = await axios.get(request7);
      const response8 = await axios.get(request8);
      const response9 = await axios.get(request9);
      const response10 = await axios.get(request10);
      let results = [
        response1.data.data,
        response2.data.data,
        response3.data.data,
        response4.data.data,
        response5.data.data,
        response6.data.data,
        response7.data.data,
        response8.data.data,
        response9.data.data,
        response10.data.data,
      ];
      setArtResults(results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const searchArt = async () => {
      try {
        const res = await axios.get(
          "https://api.artic.edu/api/v1/artworks/search?page=4&limit=12&q=Modern Art?"
        );
        let results = res.data.data;
        let links = results.map((link) => {
          let apis = link.api_link;
          return apis;
        });
        setApiLinks(links);
        console.log(apiLinks);
      } catch (err) {
        console.log(err);
      }
    };
    searchArt();
  }, []);

  useEffect(() => {
    const getImageData = async () => {
      try {
        const fields = "?fields=id,artist_display,title,image_id";
        const request1 = (await apiLinks[0]) + fields;
        const request2 = (await apiLinks[1]) + fields;
        const request3 = (await apiLinks[2]) + fields;
        const request4 = (await apiLinks[3]) + fields;
        const request5 = (await apiLinks[4]) + fields;
        const request6 = (await apiLinks[5]) + fields;
        const request7 = (await apiLinks[6]) + fields;
        const request8 = (await apiLinks[7]) + fields;
        const request9 = (await apiLinks[8]) + fields;
        const request10 = (await apiLinks[9]) + fields;
        const request11 = (await apiLinks[10]) + fields;
        const request12 = (await apiLinks[11]) + fields;

        const response1 = await axios.get(request1);
        const response2 = await axios.get(request2);
        const response3 = await axios.get(request3);
        const response4 = await axios.get(request4);
        const response5 = await axios.get(request5);
        const response6 = await axios.get(request6);
        const response7 = await axios.get(request7);
        const response8 = await axios.get(request8);
        const response9 = await axios.get(request9);
        const response10 = await axios.get(request10);
        const response11 = await axios.get(request11);
        const response12 = await axios.get(request12);
        let results = [
          response1.data.data,
          response2.data.data,
          response3.data.data,
          response4.data.data,
          response5.data.data,
          response6.data.data,
          response7.data.data,
          response8.data.data,
          response9.data.data,
          response10.data.data,
          response11.data.data,
          response12.data.data,
        ];
        setArtResults(results);
        setLoading(false);
        console.log(artResults);
      } catch (err) {
        console.error(err);
      }
    };
    getImageData();
  }, [apiLinks]);

  return (
    <>
      <h1 className="Title__text">Art Infinite</h1>
      <div className="App">
        {loading ? (
          <Loader />
        ) : (
          artResults?.map((art) => (
            <ArtCard
              id={art.id}
              name={art.artist_display}
              title={art.title}
              image={art.image_id}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;

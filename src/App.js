import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { Heading } from "./components/Heading";
import Loader from "./components/Loader";
import ArtResults from "./components/ArtResults";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

function App() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const artistsCollectionRef = collection(db, "artists");

  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const getArtists = async () => {
    const data = await query(artistsCollectionRef, limit(12));
    // const data = await getDocs(artistsCollectionRef, limit(12));
    setArtists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // const createArtist = () => {
  //   artResults.forEach((art) => {
  //     addDoc(artistsCollectionRef, {
  //       id: art.id,
  //       title: art.title,
  //       artist_display: art.artist_display,
  //       image_id: art.image_id,
  //     });
  //   });
  // };

  useEffect(() => {
    getArtists();
  }, []);

  console.log(artists);

  return (
    <>
      <Heading />
      <GlobalStyle />
      <InfiniteScroll
        dataLength={artists.length}
        next={getArtists}
        hasMore={true}
        loader={<Loader />}
        scrollThreshold={0.1}
      >
        <WrapperImages>
          {artists?.map((art, i) => (
            <ArtResults
              id={art?.id}
              name={art?.artist_display}
              title={art?.title}
              image={art?.image_id}
              key={i}
              loading={loading}
              className="box"
            />
          ))}
        </WrapperImages>
      </InfiniteScroll>
      <BTN onClick={() => topFunction()}>Top</BTN>
    </>
  );
}

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    font-family: sans-serif;
  }
  h1{
    font-size: .8rem;
  }
  p{
    font-size: .8rem;
  }
  img{
    padding: .5rem;
  }
`;

const WrapperImages = styled.section`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 2rem;
  overflow: hidden;
`;
const BTN = styled.section`
  position: fixed;
  font-size: 3rem;
  left: 0vw;
  width: 100%;
  bottom: 0;
  color: black;
  background-color: gray;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export default App;

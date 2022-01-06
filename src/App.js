import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { db } from "./firebaseConfig";
import { firebase } from "./firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { Heading } from "./components/Heading";
import Loader from "./components/Loader";
import ArtResults from "./components/ArtResults";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

function App() {
  const [artists, setArtists] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [loading, setLoading] = useState(true);
  const artistsCollectionRef = collection(db, "art");

  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
  const getArtists = async () => {
    const q = query(artistsCollectionRef, orderBy("id", "desc"), limit(20));
    const data = await getDocs(q);
    const artistResults = data.docs.map((artist) => artist.data());
    const uniqueIds = new Set();

    const unique = artistResults.filter((element) => {
      const isDuplicate = uniqueIds.has(element.id);

      uniqueIds.add(element.id);

      if (!isDuplicate) {
        return true;
      }
    });
    const lastDoc = data.docs[data.docs.length - 1];
    setArtists(unique);
    setLastDoc(lastDoc);
  };

  const fetchArtists = async () => {
    const q = query(
      artistsCollectionRef,
      orderBy("id", "desc"),
      startAfter(lastDoc),
      limit(20)
    );
    const data = await getDocs(q);
    const artistResults = data.docs.map((artist) => artist.data());
    const uniqueIds = new Set();
    const unique = artistResults.filter((element) => {
      const isDuplicate = uniqueIds.has(element.id);
      uniqueIds.add(element.id);
      if (!isDuplicate) {
        return true;
      }
    });
    const last = data.docs[data.docs.length - 1];
    setArtists((listOfArtists) => [...listOfArtists, ...unique]);
    setLastDoc(last);
  };

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
        next={fetchArtists}
        hasMore={true}
        loader={<Loader />}
        scrollThreshold={0.8}
      >
        <WrapperImages>
          {artists?.map((art, i) => (
            <ArtResults
              id={art?.id}
              name={art?.artist_display}
              title={art?.title}
              image={art?.image_id}
              i={i}
              key={i}
              loading={loading}
              className="box"
            />
          ))}
        </WrapperImages>
      </InfiniteScroll>
      <BTN onClick={() => topFunction()}>
        <Arrow></Arrow>
      </BTN>
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
    font-family: "ObjectSans-Regular", sans-serif;
    font-size: .9rem;
    margin-top: 2rem;
  }
  p{
    font-family: "ObjectSans-Regular", sans-serif;
    margin-top: .3rem;
    font-size: .8rem;
  }
  img{
    padding: .5rem;
    object-fit: cover;
    
  }
`;

const WrapperImages = styled.section`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 7rem;
  overflow: hidden;
`;
const BTN = styled.section`
  opacity: 0;
  /* background-color: #3b5df8; */
  border: solid 1px #3b5df8;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const Arrow = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
  margin-top: -9px;
  margin-left: -9px;
  border: solid #3b5df8;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`;

export default App;

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { Heading } from "./components/Heading";
import Loader from "./components/Loader";
import ArtResults from "./components/ArtResults";
import WebsiteInfo from "./components/WebsiteInfo";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { topFunction, shuffle, getRandom } from "./hooks";

function App() {
  const [artists, setArtists] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [lastSculpture, setLastSculpture] = useState();
  const [loading, setLoading] = useState(true);
  const artistsCollectionRef = collection(db, "art");
  const sculptureCollectionRef = collection(db, "sculpture");
  const order = ["asc", "desc"];
  const params = ["title", "id", "image_id"];

  const getArtists = async () => {
    const q = query(
      artistsCollectionRef,
      orderBy(getRandom(params), getRandom(order)),
      limit(10)
    );
    const q2 = query(
      sculptureCollectionRef,
      orderBy(getRandom(params), getRandom(order)),
      limit(10)
    );

    const data = await getDocs(q);
    const data2 = await getDocs(q2);

    const artistResults = data.docs.map((artist) => artist.data());
    const sculptureResults = data2.docs.map((sculpture) => sculpture.data());
    const randomIndex = shuffle([...artistResults, ...sculptureResults]);
    const uniqueIds = new Set();

    const unique = randomIndex.filter((element) => {
      const isDuplicate = uniqueIds.has(element.id);

      uniqueIds.add(element.id);

      if (!isDuplicate) {
        return true;
      }
    });

    const lastDoc = data.docs[data.docs.length - 1];
    const lastPage = data2.docs[data2.docs.length - 1];
    setArtists(unique);
    setLastDoc(lastDoc);
    setLastSculpture(lastPage);
    setLoading(false);
  };

  const fetchArtists = async () => {
    setLoading(true);
    const q = query(
      artistsCollectionRef,
      orderBy(getRandom(params), getRandom(order)),
      startAfter(lastDoc),
      limit(10)
    );
    const q2 = query(
      sculptureCollectionRef,
      orderBy(getRandom(params), getRandom(order)),
      startAfter(lastSculpture),
      limit(10)
    );
    const data = await getDocs(q);
    const data2 = await getDocs(q2);
    const artistResults = data.docs.map((artist) => artist.data());
    const sculptureResults = data.docs.map((sculpture) => sculpture.data());
    const randomIndex = shuffle([...artistResults, ...sculptureResults]);
    const uniqueIds = new Set();
    const unique = randomIndex.filter((element) => {
      const isDuplicate = uniqueIds.has(element.id);
      uniqueIds.add(element.id);
      if (!isDuplicate) {
        return true;
      }
    });
    const last = data.docs[data.docs.length - 1];
    const lastPage = data2.docs[data2.docs.length - 1];
    setArtists((listOfArtists) => [...listOfArtists, ...unique]);
    setLastSculpture(lastPage);
    setLastDoc(last);
    setLoading(false);
  };

  useEffect(() => {
    getArtists();
  }, []);

  console.log(loading);

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
      <WebsiteInfo />
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
    font-family: 'Supply-UltraLight', sans-serif;
    font-size: .75rem;
    margin-top: 1rem;
    max-width: 25rem;
  }
  p{
    font-family: 'Supply-UltraLight', sans-serif;
    margin-top: .3rem;
    font-size: .8rem;
    max-width: 25rem;
  }
  img{
    padding: .5rem;
    @media screen and (max-width: 800px) {
    padding: 0rem;
  }
  }
`;

const WrapperImages = styled.section`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 12rem;
  overflow: hidden;
  @media screen and (max-width: 800px) {
    margin-top: 0rem;
  }
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

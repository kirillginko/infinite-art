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
  const [lastPhoto, setLastPhoto] = useState();
  const [loading, setLoading] = useState(true);
  const artistsCollectionRef = collection(db, "art");
  const sculptureCollectionRef = collection(db, "sculpture");
  const photoCollectionRef = collection(db, "photo");
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
    const q3 = query(
      photoCollectionRef,
      orderBy(getRandom(params), getRandom(order)),
      limit(10)
    );

    const data = await getDocs(q);
    const data2 = await getDocs(q2);
    const data3 = await getDocs(q3);

    const artistResults = data.docs.map((artist) => artist.data());
    const sculptureResults = data2.docs.map((sculpture) => sculpture.data());
    const photoResults = data3.docs.map((photo) => photo.data());
    const randomIndex = shuffle([
      ...artistResults,
      ...sculptureResults,
      ...photoResults,
    ]);
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
    const lastPage2 = data3.docs[data2.docs.length - 1];
    setArtists(unique);
    setLastDoc(lastDoc);
    setLastSculpture(lastPage);
    setLastPhoto(lastPage2);
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
    const q3 = query(
      photoCollectionRef,
      orderBy(getRandom(params), getRandom(order)),
      startAfter(lastPhoto),
      limit(10)
    );
    const data = await getDocs(q);
    const data2 = await getDocs(q2);
    const data3 = await getDocs(q3);

    const artistResults = data.docs.map((artist) => artist.data());
    const sculptureResults = data2.docs.map((sculpture) => sculpture.data());
    const photoResults = data3.docs.map((photo) => photo.data());
    const randomIndex = shuffle([
      ...artistResults,
      ...sculptureResults,
      ...photoResults,
    ]);
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
    const lastPage2 = data2.docs[data2.docs.length - 1];
    setArtists((listOfArtists) => [...listOfArtists, ...unique]);
    setLastSculpture(lastPage);
    setLastDoc(last);
    setLastPhoto(lastPage2);
    setLoading(false);
  };

  useEffect(() => {
    getArtists();
  }, []);

  console.log(loading);

  return (
    <>
      <GlobalStyle />
      <Heading />
      <Container>
        <InfiniteScroll
          dataLength={artists.length}
          next={fetchArtists}
          hasMore={true}
          loader={<Loader />}
          scrollThreshold={0.8}
        >
          <ArtCards>
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
          </ArtCards>
        </InfiniteScroll>
        <BTN onClick={() => topFunction()}>
          <Arrow></Arrow>
        </BTN>
      </Container>
    </>
  );
}

// Style
const GlobalStyle = createGlobalStyle`
 *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    overflow-x: hidden;
 }
 h1{
    font-family: 'Supply-UltraLight', sans-serif;
    font-size: .75rem;
  }
  p{
    font-family: 'Supply-UltraLight', sans-serif;
    font-size: .8rem;

  }
`;

const Container = styled.div`
  max-width: 100%;
`;

const ArtCards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10rem;
  text-align: center;
  @media screen and (max-width: 800px) {
    display: inline-block;
    position: relative;
    width: 90%;
    left: 0%;
    text-align: center;
    transform: translateX(1.5%);
    margin-top: 1rem;
    margin: 0 auto;
    padding: 2rem;
  }
`;
const BTN = styled.section`
  opacity: 1;
  border: solid 1px #002efc;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 10px;
  right: 1.5rem;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 800px) {
    right: 5px;
  }

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
  border: solid #002efc;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`;

export default App;

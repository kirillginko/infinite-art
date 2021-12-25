import React, { useState, useEffect } from "react";
import { Heading } from "./components/Heading";
import Loader from "./components/Loader";
import axios from "axios";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import InfiniteScroll from "react-infinite-scroll-component";
import ArtResults from "./components/ArtResults";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
gsap.registerPlugin(ScrollTrigger);

const randomNumber = (min, max) => {
  let numb = Math.random() * (max - min) + min;
  let round = Math.round(numb);
  return round;
};

function App() {
  const [apiLinks, setApiLinks] = useState({});
  const [artResults, setArtResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(randomNumber(1, 100));
  const url = `https://api.artic.edu/api/v1/artworks/search?page=${page}&limit=18&q=Modern?`;

  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  useEffect(() => {
    searchArt();
  }, []);

  useEffect(() => {
    getImageData();
  }, [apiLinks]);

  const searchArt = async () => {
    let mounted = true;
    if (mounted) {
      setPage(page + 1);
      try {
        const res = await axios.get(url);
        let results = res.data.data;
        let links = results.map((link) => {
          let apis = link.api_link;
          return apis;
        });
        setApiLinks(links);
      } catch (err) {
        console.log(err);
      }
      return () => {
        mounted = false;
      };
    }
  };
  console.log(apiLinks);

  const getImageData = async () => {
    let mounted = true;
    if (apiLinks && mounted)
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
        const request13 = (await apiLinks[12]) + fields;
        const request14 = (await apiLinks[13]) + fields;
        const request15 = (await apiLinks[14]) + fields;
        const request16 = (await apiLinks[15]) + fields;
        const request17 = (await apiLinks[16]) + fields;
        const request18 = (await apiLinks[17]) + fields;

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
        const response13 = await axios.get(request13);
        const response14 = await axios.get(request14);
        const response15 = await axios.get(request15);
        const response16 = await axios.get(request16);
        const response17 = await axios.get(request17);
        const response18 = await axios.get(request18);
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
          response13.data.data,
          response14.data.data,
          response15.data.data,
          response16.data.data,
          response17.data.data,
          response18.data.data,
        ];
        let all = new Set([...artResults, ...results]);
        setArtResults([...all]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    return () => {
      mounted = false;
    };
  };

  return (
    <>
      <Heading />
      <GlobalStyle />
      <InfiniteScroll
        dataLength={artResults.length}
        next={searchArt}
        hasMore={true}
        loader={<Loader />}
        scrollThreshold={0.1}
      >
        <WrapperImages>
          {artResults?.map((art) => (
            <ArtResults
              id={art?.id}
              name={art?.artist_display}
              title={art?.title}
              image={art?.image_id}
              loading={loading}
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
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  margin: 2rem;
  margin-top: 2rem;
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

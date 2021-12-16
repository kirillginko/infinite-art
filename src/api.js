// useEffect(() => {
//   const getArt = async () => {
//     try {
//       const resp = await axios.get(
//         "https://api.artic.edu/api/v1/artworks/111060?fields=id,artist_display,title,image_id"
//       );
//       // console.log(resp.data.data);
//       let name = resp.data.data.artist_display;
//       let image = resp.data.data.image_id;
//       let title = resp.data.data.title;
//       setArtistName(name);
//       setArtTitle(title);
//       setImageId(image);
//     } catch (err) {
//       // Handle Error Here
//       console.error(err);
//     }
//   };
//   getArt();
// }, []);

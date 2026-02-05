import axios from "axios";

const UNSPLASH = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const PEXELS = process.env.NEXT_PUBLIC_PEXELS_KEY;
const GIPHY = process.env.NEXT_PUBLIC_GIPHY_KEY;

export const fetchPhotos = async (q) => {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query: q },
    headers: { Authorization: `Client-ID ${UNSPLASH}` },
  });
  return res.data;
};

export const fetchVideos = async (q) => {
  const res = await axios.get("https://api.pexels.com/videos/search", {
    params: { query: q },
    headers: { Authorization: PEXELS },
  });
  return res.data;
};

export const fetchGIF = async (q) => {
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { api_key: GIPHY, q, limit: 25 },
  });
  return res.data;
};

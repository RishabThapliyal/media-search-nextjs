import axios from "axios";

const UNSPLASH = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const PEXELS = process.env.NEXT_PUBLIC_PEXELS_KEY;
const GIPHY = process.env.NEXT_PUBLIC_GIPHY_KEY;

export const fetchPhotos = async (q, page = 1) => {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query: q, per_page: 30, page },
    headers: { Authorization: `Client-ID ${UNSPLASH}` },
  });
  return res.data;
};

export const fetchVideos = async (q, page = 1) => {
  const res = await axios.get("https://api.pexels.com/videos/search", {
    params: { query: q, per_page: 30, page },
    headers: { Authorization: PEXELS },
  });
  return res.data;
};

export const fetchGIF = async (q, offset = 0) => {
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { api_key: GIPHY, q, limit: 50, offset },
  });
  return res.data;
};

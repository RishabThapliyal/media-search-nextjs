"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, fetchVideos, fetchGIF } from "@/lib/mediaApi";
import {
  setLoading,
  setLoadingMore,
  setError,
  setResults,
  appendResults,
  setPage,
  setHasMore,
} from "../redux/features/searchSlice";
import { useEffect } from "react";
import ResultCard from "./Resultcard";

const mapPhotos = (results) =>
  results.map((item) => ({
    id: item.id,
    type: "photo",
    title: item.alt_description,
    thumbnail: item.urls.small,
    src: item.urls.full,
    url: item.links.html,
  }));

const mapVideos = (videos) =>
  videos.map((item) => ({
    id: item.id,
    type: "video",
    title: item.user.name || "video",
    thumbnail: item.image,
    src: item.video_files[0]?.link,
    url: item.url,
  }));

const mapGifs = (data) =>
  (data || []).map((item) => ({
    id: item.id,
    title: item.title || "GIF",
    type: "gif",
    thumbnail:
      item.images?.fixed_height?.url || item.images?.downsized?.url || "",
    src: item.images?.original?.url || item.images?.downsized_large?.url || "",
    url: item.url || item.embed_url || "",
  }));

const ResultGrid = () => {
  const dispatch = useDispatch();
  const {
    query,
    activeTab,
    results,
    page,
    hasMore,
    loading,
    loadingMore,
    error,
  } = useSelector((store) => store.search);

  const fetchData = async (isLoadMore = false) => {
    if (!query) return;
    try {
      if (isLoadMore) {
        dispatch(setLoadingMore());
      } else {
        dispatch(setLoading());
      }

      let data = [];
      const currentPage = isLoadMore ? page : 1;

      if (activeTab == "photos") {
        const response = await fetchPhotos(query, currentPage);
        data = mapPhotos(response.results || []);
        dispatch(setHasMore((response.results?.length || 0) >= 30));
      }
      if (activeTab == "videos") {
        const response = await fetchVideos(query, currentPage);
        const videos = response.videos || [];
        data = mapVideos(videos);
        dispatch(setHasMore(videos.length >= 30));
      }
      if (activeTab == "gif") {
        const offset = (currentPage - 1) * 50;
        const response = await fetchGIF(query, offset);
        const giphyData = response.data || [];
        data = mapGifs(giphyData);
        dispatch(setHasMore(giphyData.length >= 50));
      }

      if (isLoadMore) {
        dispatch(appendResults(data));
        dispatch(setPage(currentPage + 1));
      } else {
        dispatch(setResults(data));
        dispatch(setPage(2));
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  useEffect(() => {
    if (!query) return;
    fetchData(false);
  }, [query, activeTab]);

  const handleLoadMore = () => {
    fetchData(true);
  };

  if (error) return <h1 className="px-4 sm:px-6 md:px-10 py-6 text-red-600 text-sm sm:text-base">Error: {error}</h1>;
  if (loading) return <h1 className="px-4 sm:px-6 md:px-10 py-6">Loading...</h1>;

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 pb-6 md:pb-10 flex-1 box-border">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {results.map((item, idx) => (
          <div key={`${item.type}-${item.id}-${idx}`} className="w-full min-w-0">
            <ResultCard item={item} />
          </div>
        ))}
      </div>
      {hasMore && results.length > 0 && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultGrid;

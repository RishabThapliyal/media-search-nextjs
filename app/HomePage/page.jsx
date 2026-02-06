"use client";
import { useSelector } from "react-redux";
import ResultGrid from "../components/ResultGrid";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
const HomePage = () => {
  const { query } = useSelector((store) => store.search);

  return (
    <div className="flex flex-col min-h-full w-full">
      <SearchBar />

      {query != "" ? (
        <div className="flex-1 flex flex-col w-full">
          <Tabs />
          <ResultGrid />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;

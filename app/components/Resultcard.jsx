"use client";

import { useDispatch } from "react-redux";
import { addCollection, addedToast } from "../redux/features/collectionSlice";

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCollection = (item) => {
    dispatch(addCollection(item));
    dispatch(addedToast());
  };

  return (
    <div className="w-full max-w-full min-w-0 relative h-64 sm:h-72 md:h-80 bg-white rounded-xl overflow-hidden shadow-md">
      <a target="_blank" className="h-full" href={item.url}>
        {item.type == "photo" ? (
          <img
            className="h-full w-full object-cover object-center"
            src={item.src}
            alt=""
          />
        ) : (
          ""
        )}
        {item.type == "video" ? (
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
            src={item.src}
          ></video>
        ) : (
          ""
        )}
        {item.type == "gif" ? (
          <img
            className="h-full w-full object-cover object-center"
            src={item.src}
            alt=""
          />
        ) : (
          ""
        )}
      </a>
      <div
        id="bottom"
        className="flex justify-between gap-2 sm:gap-3 items-center w-full px-3 sm:px-4 py-4 sm:py-6 absolute bottom-0 text-white bg-gradient-to-t from-black/80 to-transparent"
      >
        <h2 className="text-sm sm:text-base md:text-lg font-semibold capitalize line-clamp-2 overflow-hidden flex-1 min-w-0">
          {item.title}
        </h2>

        <button
          onClick={() => {
            addToCollection(item);
          }}
          className="bg-indigo-600 active:scale-95 text-white rounded px-2 sm:px-3 py-1 text-sm sm:text-base cursor-pointer font-medium shrink-0"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ResultCard;

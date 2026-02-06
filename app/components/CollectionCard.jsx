"use client";
import { useDispatch } from "react-redux";
import {
  removeCollection,
  removeToast,
} from "../redux/features/collectionSlice";

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full min-w-0 sm:w-56 md:w-64 bg-white rounded overflow-hidden flex flex-col shadow-lg">
      <div className="h-48 sm:h-56 md:h-60 overflow-hidden shrink-0">
        {item.type === "video" ? (
          <video
            src={item.src}
            controls
            className="h-full w-full object-cover"
          />
        ) : (
          <img src={item.src} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <button
        onClick={() => {
          dispatch(removeCollection({ type: item.type, id: item.id }));
          dispatch(removeToast());
        }}
        className="w-full bg-red-600 text-white py-2 sm:py-3 text-sm sm:text-base cursor-pointer hover:bg-red-700 transition font-medium"
      >
        Remove
      </button>
    </div>
  );
};

export default CollectionCard;

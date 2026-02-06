"use client";
import { useDispatch, useSelector } from "react-redux";
import CollectionCard from "../components/CollectionCard";
import { clearCollection } from "../redux/features/collectionSlice";

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items);

  const dispatch = useDispatch();

  const clearAll = () => {
    dispatch(clearCollection());
  };

  return (
    <div className="overflow-auto px-4 sm:px-6 md:px-10 py-4 sm:py-6">
      {collection.length > 0 ? (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-medium">Your Collection</h2>
          <button
            onClick={() => {
              clearAll();
            }}
            className="active:scale-95 transition cursor-pointer bg-red-600 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-medium rounded w-full sm:w-auto"
          >
            Clear Collection
          </button>
        </div>
      ) : (
        <h2 className="text-2xl sm:text-4xl md:text-5xl py-8 sm:py-10 text-gray-300 text-center font-medium px-4">
          Collection is Empty
        </h2>
      )}

      <div className="flex flex-wrap justify-center sm:justify-start w-full gap-4 sm:gap-5 md:gap-6">
        {collection.map((item) => (
          <div key={`${item.type}-${item.id}`} className="w-full sm:w-56 md:w-64">
            <CollectionCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;

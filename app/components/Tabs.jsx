"use client";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs } from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "videos", "gif"];

  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-5 p-4 sm:p-6 md:p-10">
      {tabs.map(function (elem, idx) {
        return (
          <button
            className={`${activeTab == elem ? "bg-blue-700" : "bg-gray-500"} transition cursor-pointer 
            active:scale-95 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded uppercase text-sm sm:text-base`}
            key={idx}
            onClick={() => {
              dispatch(setActiveTabs(elem));
            }}
          >
            {elem}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;

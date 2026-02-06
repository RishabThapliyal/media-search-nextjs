"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";

const SearchBar = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));
    setText("");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-5 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-10"
      >
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
          className="w-full border-2 px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg md:text-xl rounded outline-none"
          type="text"
          placeholder="Search anything..."
        />

        <button className="active:scale-95 cursor-pointer border-2 px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg md:text-xl rounded outline-none shrink-0">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

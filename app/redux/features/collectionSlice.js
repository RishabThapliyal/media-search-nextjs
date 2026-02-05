import { createSlice } from "@reduxjs/toolkit";
import { toast, Zoom } from "react-toastify";

const initialState = {
  items: [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    hydrateCollection: (state, action) => {
      state.items = action.payload || [];
    },
    addCollection: (state, action) => {
      const payload = action.payload;
      const uniqueKey = `${payload.type}-${payload.id}`;
      const alreadyExists = state.items.find(
        (item) => `${item.type}-${item.id}` === uniqueKey,
      );
      if (!alreadyExists) {
        state.items.push(payload);
        localStorage.setItem("collection", JSON.stringify(state.items));
      }
    },
    removeCollection: (state, action) => {
      const { type, id } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.type === type && String(item.id) === String(id)),
      );
      localStorage.setItem("collection", JSON.stringify(state.items));
    },
    clearCollection: (state) => {
      state.items = [];
      localStorage.removeItem("collection");
    },
    addedToast: () => {
      toast.success("Added to Collection ✅", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    },
    removeToast: () => {
      toast.error("Removed from Collection", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    },
  },
});

export const {
  hydrateCollection,
  addCollection,
  removeCollection,
  clearCollection,
  addedToast,
  removeToast,
} = collectionSlice.actions;

export default collectionSlice.reducer;

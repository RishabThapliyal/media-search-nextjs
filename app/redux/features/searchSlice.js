import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    activeTab: "photos",
    results: [],
    page: 1,
    hasMore: true,
    loading: false,
    loadingMore: false,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
      state.hasMore = true;
    },
    setActiveTabs(state, action) {
      state.activeTab = action.payload;
      state.page = 1;
      state.hasMore = true;
      state.results = [];
    },
    setResults(state, action) {
      state.results = action.payload;
      state.loading = false;
      state.loadingMore = false;
    },
    appendResults(state, action) {
      state.results = [...state.results, ...action.payload];
      state.loadingMore = false;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setLoadingMore(state) {
      state.loadingMore = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.loadingMore = false;
    },
    clearResults(state) {
      state.results = [];
      state.page = 1;
      state.hasMore = true;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
  },
});

export const {
  setQuery,
  setActiveTabs,
  setError,
  setLoading,
  setLoadingMore,
  setResults,
  appendResults,
  clearResults,
  setPage,
  setHasMore,
} = searchSlice.actions;

export default searchSlice.reducer;

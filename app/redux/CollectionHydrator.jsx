"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateCollection } from "./features/collectionSlice";

export default function CollectionHydrator({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("collection");
      if (stored) {
        const items = JSON.parse(stored);
        dispatch(hydrateCollection(items));
      }
    } catch {}
  }, [dispatch]);

  return children;
}

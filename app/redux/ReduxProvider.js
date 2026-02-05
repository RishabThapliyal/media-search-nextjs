"use client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store";
import CollectionHydrator from "./CollectionHydrator";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <CollectionHydrator>
        <ToastContainer />
        {children}
      </CollectionHydrator>
    </Provider>
  );
}

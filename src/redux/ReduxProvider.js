"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { nextStore } from "./storage/nextStorage";

export default function ReduxProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = nextStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

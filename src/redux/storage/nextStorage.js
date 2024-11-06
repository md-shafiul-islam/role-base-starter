import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducer";

export const nextStore = () => {
  return configureStore({
    reducer: reducer(),
  });
};

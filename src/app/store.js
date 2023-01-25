import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "../features/loader/loaderSlice";

export const store = configureStore({
reducer: {
    loader: loaderSlice
},
});
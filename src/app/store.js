import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "../features/course/courseSlice";
import loaderSlice from "../features/loader/loaderSlice";

export const store = configureStore({
reducer: {
    loader: loaderSlice,
    course: courseSlice
},
});
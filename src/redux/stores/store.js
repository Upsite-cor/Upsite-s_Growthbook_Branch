import { configureStore } from "@reduxjs/toolkit";
import audioPlayerSlice from "../features/audioPlayer/audioPlayerSlice";
import authSlice from "../features/auth/authSlice";
import courseSlice from "../features/course/courseSlice";
import loaderSlice from "../features/loader/loaderSlice";

export const store = configureStore({
reducer: {
    loader: loaderSlice,
    course: courseSlice,
    audioPlayer: audioPlayerSlice,
    auth: authSlice,
},
});
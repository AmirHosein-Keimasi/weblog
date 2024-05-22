import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "../reducers/blogSlice";

export const store = configureStore({
  reducer: {
    blog: blogSlice,
  },
});

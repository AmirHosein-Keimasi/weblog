import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/blogSlice";
import usersReducer, { fetchUsers } from "../reducers/userSlice";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

//fetch all users from api
store.dispatch(fetchUsers());

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: nanoid(),
    date: new Date().toISOString(),
    title: "اولین پست",
    content: "محتوای اولین پست",
  },
  {
    id: nanoid(),
    date: new Date().toISOString(),
    title: "دومین پست",
    content: "محتوای دومین پست",
  },
];

const BlogsSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
});

export default BlogsSlice.reducer;

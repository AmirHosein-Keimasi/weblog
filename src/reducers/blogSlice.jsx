import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "../services/BlogServises";

const blogAdaptor = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = blogAdaptor.getInitialState({
  status: "idle",
  error: null,
});

export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
  const response = await getAllBlogs();
  return response.data;
});
export const addNewBlogs = createAsyncThunk(
  "/blogs/addNewBlogs",
  async (initialBlog) => {
    const response = await createBlog(initialBlog);
    return response.data;
  }
);

export const deleteApiBlog = createAsyncThunk(
  "/blogs/deleteApiBlog",
  async (initialBlogId) => {
    await deleteBlog(initialBlogId);
    return initialBlogId;
  }
);
export const updateApiBlog = createAsyncThunk(
  "/blogs/updateApiBlog",
  async (initialBlog) => {
    const response = await updateBlog(initialBlog, initialBlog.id);
    return response.data;
  }
);
const blogsSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {
    blogUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingBlog = state.entities[id];

      if (existingBlog) {
        existingBlog.title = title;
        existingBlog.content = content;
      }
    },
    reactionAdded: (state, action) => {
      const { blogId, reaction } = action.payload;
      const existingBlog = state.entities[blogId];
      if (existingBlog) {
        existingBlog.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "completed";
        // state.blogs = action.payload;
        blogAdaptor.upsertMany(state, action.payload);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewBlogs.fulfilled, blogAdaptor.addOne)
      // .addCase(deleteApiBlog.fulfilled, (state, action) => {
      //   state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      // })
      .addCase(deleteApiBlog.fulfilled, blogAdaptor.removeOne)

      // .addCase(updateApiBlog.fulfilled, (state, action) => {
      //   const { id } = action.payload;
      //   const UpdateBlogIndex = state.blogs.findIndex((blog) => blog.id === id);
      //   state.blogs[UpdateBlogIndex] = action.payload;
      // })
      .addCase(updateApiBlog.fulfilled, blogAdaptor.updateOne);
  },
});

// export const selectAllBlogs = (state) => state.blogs.blogs;
// export const selectBlogById = (state, blogId) =>
//   state.blogs.blogs.find((blog) => blog.id === blogId);

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
} = blogAdaptor.getSelectors((state) => state.blogs);

export const selectUserBlogs = createSelector(
  [selectAllBlogs, (state, userId) => userId],
  (blogs, userId) => blogs.filter((blog) => blog.user === userId)
);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } =
  blogsSlice.actions;

export default blogsSlice.reducer;

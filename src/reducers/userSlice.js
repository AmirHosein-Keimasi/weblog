import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, getAllUsers } from "../services/BlogServises";

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
  const response = await getAllUsers();
  return response.data;
});
export const deleteApiUser = createAsyncThunk(
  "/users/deleteApiUser",
  async (initialUserId) => {
    await deleteApiUser(initialUserId);
    return initialUserId;
  }
);
export const addNewUser = createAsyncThunk(
  "/blogs/addNewUser",
  async (initialBlog) => {
    const response = await createUser(initialBlog);
    return response.data;
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteApiUser.fulfilled, (state, action) => {
        return state.filter((user) => user.id !== action.payload);
      });
  },
});
export const selectAllUser = (state) => state.users;
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId);

export default usersSlice.reducer;

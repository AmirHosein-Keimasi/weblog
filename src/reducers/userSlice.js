import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { createUser, getAllUsers } from "../services/BlogServises";

const userAdaptor = createEntityAdapter();
const initialState = userAdaptor.getInitialState();

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
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, userAdaptor.setAll)
      .addCase(addNewUser.fulfilled, userAdaptor.addOne)
      .addCase(deleteApiUser.fulfilled, userAdaptor.removeOne);
  },
});
// export const selectAllUser = (state) => state.users;
// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId);
export const { selectAll: selectAllUser, selectById: selectUserById } =
  userAdaptor.getSelectors((state) => state.users);

export default usersSlice.reducer;

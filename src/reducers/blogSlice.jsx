import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: nanoid(),
    title: "اولین پست",
    content: "محتوای اولین پست ما ☺️",
  },
  {
    id: nanoid(),
    title: "دومین پست",
    content: "دومین پست ما میباشد سلام دنیا 🤗",
  },
];

const blogsSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {
    blogAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        //Complex logic
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    blogUpdated:(state,action)=>{
        const {id,title,content}=action.payload;
        const existingBlog=state.find((blog)=>blog.id===id)
        if(existingBlog){
            existingBlog.title=title;
            existingBlog.content=content;
      }
    }
  },
});

export const { blogUpdated ,blogAdded} = blogsSlice.actions;

export default blogsSlice.reducer;

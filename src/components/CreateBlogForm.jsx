import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUser } from "../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useAddNewBlogMutation } from "../api/apiSlice";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [addNewBlog, { isLoading }] = useAddNewBlogMutation();

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const users = useSelector(selectAllUser);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const handleSubmitForm = async () => {
    if (canSave) {
      try {
        await addNewBlog({
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user: userId,
          reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          },
        }).unwrap();
        setContent(""), setTitle(""), setUserId(""), navigate("/");
      } catch (error) {
        console.error("Failed to save the New Blog ", error);
      }
    }
  };
  return (
    <section>
      <h2>ساخت پست جدید</h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست :</label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="blogAuthor">نویسنده :</label>
        <select id="blogAuthor" value={userId} onChange={onAuthorChange}>
          <option value="">انتخاب نویسنده</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.fullname}
            </option>
          ))}
        </select>
        <label htmlFor="blogContent">محتوای اصلی :</label>

        <textarea
          id="blogContent"
          name="blogContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={handleSubmitForm} disabled={!canSave}>
          ذخیره پست
        </button>
      </form>
    </section>
  );
};

export default CreateBlogForm;

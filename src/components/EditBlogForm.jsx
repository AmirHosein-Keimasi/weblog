import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditBlogMutation, useGetBlogQuery } from "../api/apiSlice";

const EditBlogForm = () => {
  const { blogId } = useParams();
  const { data: blog } = useGetBlogQuery(blogId);
  const [updateBlog, { isLoading }] = useEditBlogMutation();

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const navigate = useNavigate();
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  if (!blog) {
    return (
      <section>
        <h2>پستی که دنبالش میگردی وجود نداره دوست من 🤗</h2>
      </section>
    );
  }

  const handleSubmitForm = async () => {
    if (title && content) {
      const editBlog = {
        id: blogId,
        date: blog.date,
        title,
        content,
        user: blog.user,
        reactions: {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        },
      };
      await updateBlog({ ...editBlog });
      navigate(`/blogs/${blog.id}`);
    }
  };
// kir to seyed
  return (
    <section>
      <h2>ویرایش پست </h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست :</label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="blogContent">محتوای اصلی :</label>
        <textarea
          id="blogContent"
          name="blogContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={handleSubmitForm}>
          ذخیره پست
        </button>
      </form>
    </section>
  );
};

export default EditBlogForm;

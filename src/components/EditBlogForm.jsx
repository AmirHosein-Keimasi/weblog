import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { blogUpdated, selectBlogById } from "../reducers/blogSlice";

const EditBlogForm = () => {
  const { blogId } = useParams();

  const blog = useSelector((state) => selectBlogById(state,blogId));

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const dispatch = useDispatch();
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

  const handleSubmitForm = () => {
    if (title && content) {
      dispatch(blogUpdated({ id: blogId, title, content }));
      navigate(`/blogs/${blog.id}`);
    }
  };

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

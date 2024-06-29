import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchBlogs, selectAllBlogs } from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionBtns";
import { useEffect } from "react";

const BlogsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector(selectAllBlogs);
  const blogStatus = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    console.log(blogStatus);

    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  const orderBlogs = blogs.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedBlogs = orderBlogs.map((blog) => (
    <article key={blog.id} className="blog-excerpt">
      <h3>{blog.title}</h3>
      <div style={{ marginTop: 10 }}>
        <ShowTime timestamp={blog.date} />
        <ShowAuthor userId={blog.user} />
      </div>
      <p className="blog-content">{blog.content.substring(0, 100)}</p>
      <ReactionButtons blog={blog} />
      <Link to={`/blogs/${blog.id}`} className="button muted-button">
        دیدن کامل پست
      </Link>
    </article>
  ));

  return (
    <section className="blog-list">
      <button
        className="full-button accent-button"
        style={{
          marginTop: "1em",
        }}
        onClick={() => navigate("/blogs/create-blog")}
      >
        ساخت پست جدید
      </button>
      <h2>تمامی پست ها</h2>
      {renderedBlogs}
    </section>
  );
};

export default BlogsList;

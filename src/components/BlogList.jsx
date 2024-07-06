import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchBlogs, selectAllBlogs } from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionBtns";
import { memo, useEffect } from "react";
import Spinner from "./Spinner";

let Blog = ({ blog }) => {
  return (
    <>
      <article className="blog-excerpt">
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
    </>
  );
};
Blog = memo(Blog);

const BlogsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector(selectAllBlogs);
  const blogStatus = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  let content;
  if (blogStatus === "loading") {
    content = <Spinner text="در حال بارگذاری" />;
  } else if (blogStatus === "completed") {
    const orderBlogs = blogs
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderBlogs.map((blog) => <Blog key={blog.id} blog={blog} />);
  } else if (blogStatus === "failed") {
    content = <div className="">{error.message}</div>;
  }
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
      {content}
    </section>
  );
};

export default BlogsList;

import { Link, useNavigate } from "react-router-dom";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionBtns";
import { useMemo } from "react";
import Spinner from "./Spinner";
import { useGetBlogsQuery } from "../api/apiSlice";

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

const BlogsList = () => {
  const navigate = useNavigate();

  const {
    data: blogs = [],
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetBlogsQuery();

  const sortedBlogs = useMemo(() => {
    // const sortedBlogs = blogs.slice();
    const sortedBlogs = blogs
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    return sortedBlogs;
  }, [blogs]);

  let content;
  if (isLoading) {
    content = <Spinner text="در حال بارگذاری" />;
  } else if (isSuccess) {
    content = sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />);
  } else if (isError) {
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

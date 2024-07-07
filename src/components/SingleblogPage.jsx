import { useParams, Link, useNavigate } from "react-router-dom";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionBtns";
import { useGetBlogQuery } from "../api/apiSlice";
import Spinner from "./Spinner";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const { data: blog = [], isSuccess, isFetching } = useGetBlogQuery(blogId);

  // const handleDelete = () => {
  //   if (blog) {
  //     navigate("/");
  //   }
  // };

  let content;
  if (isFetching) {
    content = <Spinner text="در حال بارگذاری" />;
  } else if (isSuccess) {
    content = (
      <article className="blog">
        <h2>{blog.title}</h2>
        <div className="">
          <ShowTime timestamp={blog.date} />
          <ShowAuthor userId={blog.use} />
        </div>
        <p className="blog-content">{blog.content}</p>
        <ReactionButtons blog={blog} />
        <Link to={`/editBlog/${blog.id}`} className="button">
          ویرایش پست
        </Link>
        <button
          className="muted-button"
          style={{ marginRight: "10px" }}
          // onClick={handleDelete}
        >
          حذف پست
        </button>
      </article>
    );
  }
  return <section>{content}</section>;
};

export default SingleBlogPage;

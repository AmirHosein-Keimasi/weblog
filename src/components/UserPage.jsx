import React, { useId } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "../reducers/userSlice";
import { selectAllBlogs } from "../reducers/blogSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));

  const userBlogs = useSelector((state) => {
    const allBlogs = selectAllBlogs(state);
    return allBlogs.filter((blog) => blog.user === userId);
  });

  const blogTitle = userBlogs.map((blog) => (
    <li key={blog.id}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </li>
  ));
  return (
    <>
      <section>
        <h2>{user.fullname}</h2>

        <ul>
          {userBlogs.length > 0 ? (
            blogTitle
          ) : (
            <li style={{ listStyleType: "none" }}>
              نویسنده مورد نظر هیچ پستی منتشر نکرده است
            </li>
          )}
        </ul>
      </section>
    </>
  );
};

export default UserPage;

import { useDispatch, useSelector } from "react-redux";
import { addNewUser, selectAllUser } from "../reducers/userSlice";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { deleteApiUser } from "../services/BlogServises";

const UsersList = () => {
  const users = useSelector(selectAllUser);
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const onUserChange = (e) => setUser(e.target.value);
  const cansave = Boolean(user);

  const handelSubmit = () => {
    if (cansave) {
      dispatch(addNewUser({ fullname: user, id: nanoid() }));
    }
  };
  const handelDelete = (e) => {
    dispatch(deleteApiUser(e));
  };
  const renderUserList = users.map((user) => (
    <p key={user.id}><Link
        style={{ marginLeft: "5px", color: "red" }}
        onClick={() => {
          handelDelete(user.id);
        }}
      >
        {" "}
        &otimes;
      </Link>
      <Link to={`/users/${user.id}`}> {user.fullname}</Link>
      
    </p>
  ));
  return (
    <>
      <section>
        <form autoComplete="off">
          <label htmlFor="user">اضافه کردن نویسنده</label>
          <input
            type="text"
            name="user"
            id="user"
            value={user}
            onChange={onUserChange}
          />
          <button onClick={handelSubmit} disabled={!cansave}>
            اضافه کردن نویسنده
          </button>
        </form>
        <h2>لیست نویسندگان</h2>
        <ul>{renderUserList}</ul>
      </section>
    </>
  );
};

export default UsersList;

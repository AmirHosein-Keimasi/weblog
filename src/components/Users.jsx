import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectAllUser } from "../reducers/userSlice";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector(selectAllUser);

  const renderUserList = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}> {user.fullname}</Link>
    </li>
  ));
  return (
    <>
      <section>
        <h2>لیست نویسندگان</h2>
        <ul>{renderUserList}</ul>
      </section>
    </>
  );
};

export default Users;

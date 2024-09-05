import { Link } from "react-router-dom";
import style from "./user-list.module.scss";
import { useEffect, useState } from "react";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    const userList = await fetch("http://localhost:3000/users");
    const data = await userList.json();
    setUserList(data);
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={style.list__container}>
      <div className={style.list__wrapper}>
        <div className={style.list__header}>
          <h3>User Management</h3>
          <Link to="/user/create">
            <span></span>
            <span>Add new user</span>
          </Link>
        </div>
        <div>
          <table className={style.list__table}>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Date Created</th>
              <th>Action</th>
            </tr>
            {userList?.map((item, index) => {
              return (
                <tr key={item?.id}>
                  <td>{index + 1}</td>
                  <td>{item?.fullName}</td>
                  <td>{item?.email}</td>
                  <td>{item?.department}</td>
                  <td>{item?.position}</td>
                  <td>04/10/2013</td>
                  <td className={style.list__action}>
                    <Link
                      to={`/user/${item?.id}`}
                      className={style.list__btn__edit}
                    ></Link>
                    <button
                      className={style.list__btn__delete}
                      onClick={() => deleteUser(item?.id)}
                    ></button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};
export default UserList;

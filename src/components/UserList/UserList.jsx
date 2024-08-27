import { Link } from "react-router-dom";
import style from "./user-list.module.scss";

const UserList = () => {
  return (
    <div className={style.list__container}>
      <div className={style.list__wrapper}>
        <div className={style.list__header}>
          <h3>User Management</h3>
          <Link to="/">
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
            <tr>
              <td>1</td>
              <td>Đào Bá Tuấn</td>
              <td>tuananh@gmail.com</td>
              <td>VTI</td>
              <td>Developer</td>
              <td>04/10/2013</td>
              <td className={style.list__action}>
                <Link to="/" className={style.list__btn__edit}></Link>
                <button className={style.list__btn__delete}></button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
export default UserList;

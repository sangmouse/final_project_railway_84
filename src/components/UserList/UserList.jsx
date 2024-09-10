import { Link } from "react-router-dom";
import style from "./user-list.module.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";

const department = [
  {
    value: "vti",
    label: "VTI Group",
  },
  {
    value: "fsoft",
    label: "FPT Software",
  },
  {
    value: "cmc",
    label: "CMC Corporation",
  },
  {
    value: "rikkesoft",
    label: "RikkeSoft",
  },
];

const position = [
  {
    value: "dev",
    label: "Developer",
  },
  {
    value: "ba",
    label: "Business Analyst",
  },
  {
    value: "comtor",
    label: "Comtor",
  },
  {
    value: "sale",
    label: "Saler",
  },
];

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

  const handleShow = () => setShow(true);

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
    setShow(false);
  };

  const renderDepartment = (value) => {
    const departmentSelected = department.find((item) => item.value === value);
    return departmentSelected.label;
  };

  const renderPosition = (value) => {
    const positionSelected = position.find((item) => item.value === value);
    return positionSelected.label;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
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
                    <td>{renderDepartment(item?.department)}</td>
                    <td>{renderPosition(item?.position)}</td>
                    <td>{moment(item?.dateCreated).format("ll")}</td>
                    <td className={style.list__action}>
                      <Link
                        to={`/user/${item?.id}`}
                        className={style.list__btn__edit}
                      ></Link>
                      <button
                        className={style.list__btn__delete}
                        onClick={() => {
                          handleShow();
                          setUserSelected(item);
                        }}
                      ></button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
      <Modal show={show} centered>
        <Modal.Header className="justify-content-center">
          <Modal.Title>Are you sure delete user ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center column-gap-3">
            <button
              className={style.btn__popup__delete}
              onClick={() => {
                deleteUser(userSelected?.id);
                setUserSelected(null);
              }}
            >
              Yes
            </button>
            <button
              className={style.btn__popup__cancel}
              onClick={() => {
                setShow(false);
                setUserSelected(null);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UserList;

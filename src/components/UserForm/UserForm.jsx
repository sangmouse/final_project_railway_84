/**
 *
 * + ID - auto generate,
 * + Email - input:email
 * + Full Name - input:text
 * + Department - select
 * + Position - select
 * + Date Created - auto generate
 */

import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./user-form.module.scss";
import { useEffect, useState } from "react";

const UserForm = () => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    department: "vti",
    position: "dev",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const submitForm = async () => {
    if (!user?.email || !user?.fullName) {
      setErrorMsg("Please full fill form data");
      return;
    }

    if (!id) {
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
      });
    } else {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
      });
      navigate("/");
    }

    setUser({
      email: "",
      fullName: "",
      department: "",
      position: "",
    });
  };

  const fetchUserDetail = async () => {
    const data = await fetch(`http://localhost:3000/users/${id}`);
    const userDetail = await data.json();
    setUser({
      ...user,
      email: userDetail?.email,
      fullName: userDetail?.fullName,
      department: userDetail?.department,
      position: userDetail?.position,
    });
  };

  useEffect(() => {
    if (id) {
      fetchUserDetail();
    }

    return () =>
      setUser({
        email: "",
        fullName: "",
        department: "",
        position: "",
      });
  }, [id]);

  return (
    <>
      <div className={style.btn__back}>
        <Link to="/">Back to home</Link>
      </div>
      <div className={style.form__container}>
        <div className={style.form}>
          <h3 className={style.heading}>{id ? "Edit" : "Registration"} Form</h3>
          <div className={style.form__wrap}>
            <small>{errorMsg}</small>
            <div className={style.form__item}>
              <p>Email</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={user?.email}
                onChange={(e) => {
                  setErrorMsg("");
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className={style.form__item}>
              <p>Full Name</p>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                value={user?.fullName}
                onChange={(e) => {
                  setErrorMsg("");
                  setUser({
                    ...user,
                    fullName: e.target.value,
                  });
                }}
              />
            </div>
            <div className={style.form__item}>
              <p>Department</p>
              <select
                name="department"
                id="department"
                value={user?.department}
                onChange={(e) => {
                  setErrorMsg("");
                  setUser({
                    ...user,
                    department: e.target.value,
                  });
                }}
              >
                <option value="vti">VTI Academy</option>
                <option value="fsoft">FPT Software</option>
                <option value="cmc">CMC Corporation</option>
                <option value="rikkesoft">RikkeSoft</option>
              </select>
            </div>
            <div className={style.form__item}>
              <p>Position</p>
              <select
                name="position"
                id="position"
                value={user?.position}
                onChange={(e) => {
                  setErrorMsg("");
                  setUser({
                    ...user,
                    position: e.target.value,
                  });
                }}
              >
                <option value="dev">Developer</option>
                <option value="ba">Business Analyst</option>
                <option value="comtor">Comtor</option>
                <option value="sale">Saler</option>
              </select>
            </div>
            <div>
              <button className={style.btn__submit} onClick={submitForm}>
                {id ? "Save" : "Create new user"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserForm;

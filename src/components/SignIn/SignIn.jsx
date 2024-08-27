import style from "./signin.module.scss";

export default function SignIn() {
  return (
    <div className={style["sign-in"]}>
      <div className={style["sign-in__container"]}>
        <div className={style["sign-in__heading"]}>Welcome</div>
        <form action="">
          <input
            type="email"
            placeholder="Email"
            className={style["sign-in__textfield"]}
          />
          <input
            type="password"
            placeholder="Password"
            className={style["sign-in__textfield"]}
          />
          <button className={style["sign-in__btn"]}>Login</button>
        </form>
      </div>
    </div>
  );
}

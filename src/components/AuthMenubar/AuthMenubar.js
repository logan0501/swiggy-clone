import classes from "./AuthMenubar.module.css";

export default function AuthMenubar(props) {
  const closeMenu = () => {
    props.onMenuClose();
    props.onReset();
  };
  const onClickHandler = () => {
    if (props.menuStatus === "login") {
      props.onMenuChange("signup");
      props.onReset();
    }
    if (props.menuStatus === "signup") {
      props.onMenuChange("login");
    }
  };
  return (
    <section
      className={`${classes["home-login-container"]} ${props.className}`}
    >
      <span className={classes["cross-icon"]} onClick={closeMenu}>
        X
      </span>
      <div className={classes["home-login-div"]}>
        <div>
          <h3>{props.title}</h3>
          <span>
            or <button onClick={onClickHandler}>{props.subtitle}</button>
          </span>
          <div className={classes["login-underline"]}></div>
        </div>
        <img
          src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
          alt=""
        />
      </div>
      {props.children}
    </section>
  );
}

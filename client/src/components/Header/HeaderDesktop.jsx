import React, { useState } from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../API/userauthAPI";
import { openModal } from "../../redux/modal/modalSlice";
import { REGISTER, LOGIN, ADD_STORY } from "../../globals";
import avatar from "../../assets/avatar.png";
import bookmarkImg from "../../assets/bookmark.jpg";

const HeaderDesktop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, username } = useSelector((state) => state.userauth);

  const [menuClick, setMenuClick] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleMenuClick = () => {
    setMenuClick(!menuClick);
  };
  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.logoText}>SwipTory</h2>
        <div className={styles.headerBtns}>
          {!isAuthenticated ? (
            <>
              <Button
                text="Register Now"
                myFunction={() => dispatch(openModal(REGISTER))}
                size="small"
              ></Button>
              <Button
                text="Sign In"
                myFunction={() => dispatch(openModal(LOGIN))}
                size="small"
                color="#73abff"
              ></Button>
            </>
          ) : (
            <>
              <Button
                text="Bookmarks"
                myFunction={() => navigate("/bookmarks")}
                size="small"
              >
                <img
                  src={bookmarkImg}
                  alt="bookmarkImg"
                  width="14rem"
                  style={{ marginRight: "3px" }}
                />
              </Button>

              <Button
                text="Add story"
                myFunction={() => dispatch(openModal(ADD_STORY))}
                size="small"
              ></Button>
              <div>
                <img
                  src={avatar}
                  alt="avatar"
                  className={styles.profile}
                  width="40rem"
                  onClick={() => navigate("/")}
                />
              </div>
              <div
                className="hamburger"
                style={{ cursor: "pointer" }}
                onClick={handleMenuClick}
              >
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13H19M1 7H19M1 1H19"
                    stroke="black"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                </svg>
                {menuClick && (
                  <div className={styles.hamburger_content}>
                    <h4 style={{ marginBottom: "1rem" }}>{username}</h4>
                    <Button text="logout" myFunction={handleLogout}></Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default HeaderDesktop;

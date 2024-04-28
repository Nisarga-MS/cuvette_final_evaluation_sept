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
import closeIcon from "../../assets/close.png";

const HeaderMobile = () => {
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
    <header className={styles.header}>
      <h2 className={styles.logoText}>SwipTory</h2>
      <div className={styles.headerBtns}>
        {!isAuthenticated ? (
          <>
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
                <div
                  className={styles.hamburger_content_mob}
                  style={{ height: "18rem" }}
                >
                  <Button
                    text="Register Now"
                    myFunction={() => dispatch(openModal(REGISTER))}
                    size="small"
                  ></Button>
                  <div style={{ height: "1rem" }}></div>
                  <Button
                    text="Sign In"
                    myFunction={() => dispatch(openModal(LOGIN))}
                    size="small"
                  ></Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
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
                <div className={styles.hamburger_content_mob}>
                  <div className={styles.user_div}>
                    <img
                      src={avatar}
                      alt="avatar"
                      width="40rem"
                      className={styles.profile}
                      onClick={() => navigate("/")}
                    />
                    <h4 style={{ marginBottom: "1rem" }}>{username}</h4>
                  </div>
                  <Button
                    text="Your Story"
                    myFunction={() => navigate("/my/stories")}
                    size="small"
                  ></Button>
                  <Button
                    text="Bookmarks"
                    myFunction={() => navigate("/bookmarks")}
                    size="small"
                  >
                    <img
                      src={bookmarkImg}
                      alt="bookmrkImg"
                      width="14rem"
                      style={{ marginRight: "3px" }}
                    />
                  </Button>
                  <Button
                    text="Add story"
                    myFunction={() => dispatch(openModal(ADD_STORY))}
                    size="small"
                  ></Button>
                  <Button
                    text="logout"
                    myFunction={handleLogout}
                    size="small"
                  ></Button>
                </div>
              )}
            </div>
          </>
        )}
        {menuClick && (
          <div className={styles.close} onClick={handleMenuClick}>
            <img src={closeIcon} alt="close" />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderMobile;

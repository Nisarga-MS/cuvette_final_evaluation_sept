import React, { useEffect, useState } from "react";
import styles from "./UserAuth.module.css";
import { REGISTER, LOGIN } from "../../globals";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../redux/modal/modalSlice";
import { login, register, findUser } from "../API/userauthAPI";

const Error = ({ error }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
};

const UserAuth = () => {
  const dispatch = useDispatch();
  const { modalContent, modal } = useSelector((state) => state.modal);
  const { isAuthenticated, username: user } = useSelector(
    (state) => state.userauth
  );

  useEffect(() => {
    modalContent === REGISTER
      ? dispatch(openModal(REGISTER))
      : dispatch(openModal(LOGIN));
    if (isAuthenticated) {
      dispatch(closeModal());
      dispatch(findUser(user));
    }
  }, [dispatch, isAuthenticated, modal]);

  //states
  const [values, setValues] = useState({ username: "", password: "" });
  const { username, password } = values;
  const [error, setError] = useState(null);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalContent === LOGIN) {
      dispatch(login(values)).catch((error) => {
        setError(error);
      });
    }
    if (modalContent === REGISTER) {
      dispatch(register(values)).catch((error) => {
        setError(error);
      });
    }
  };

  return (
    <div
      className={`${styles.uauthContainer}`}
      style={{
        display:
          modalContent === LOGIN || modalContent === REGISTER ? "flex" : "none",
      }}
    >
      <div className={styles.uauthForm__container}>
        <h2 className={styles.uauth_heading}>
          {modalContent === LOGIN ? "Login" : "Register"} to SwipTroy
        </h2>
        <svg
          className={`${styles.closeIcon} `}
          onClick={handleClose}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0C5.38341 0 0 5.38341 0 12C0 18.6166 5.38341 24 12 24C18.6166 24 24 18.6166 24 12C24 5.38341 18.6166 0 12 0ZM12 1.84615C17.6178 1.84615 22.1538 6.38221 22.1538 12C22.1538 17.6178 17.6178 22.1538 12 22.1538C6.38221 22.1538 1.84615 17.6178 1.84615 12C1.84615 6.38221 6.38221 1.84615 12 1.84615ZM8.50962 7.18269L7.18269 8.50962L10.6731 12L7.18269 15.4904L8.50962 16.8173L12 13.3269L15.4904 16.8173L16.8173 15.4904L13.3269 12L16.8173 8.50962L15.4904 7.18269L12 10.6731L8.50962 7.18269Z"
            fill="#FF0000"
          />
        </svg>
        {/* form */}
        <form onSubmit={handleSubmit} className={styles.uauthForm}>
          <div className={styles.input_container}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              name="username"
              onChange={handleChange}
              className={styles.uauthForm__input}
            />
          </div>
          <div className={styles.input_container}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              name="password"
              onChange={handleChange}
              className={styles.uauthForm__input}
            />
          </div>
          {error && <Error error={error} />}
          <div className={styles.uauthForm__button_container}>
            <button type="submit" className={styles.uauthForm__button}>
              {modalContent === REGISTER ? "Register" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;

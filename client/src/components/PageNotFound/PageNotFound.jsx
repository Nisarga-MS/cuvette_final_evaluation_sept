import React from "react";
import styles from "./PageNotFound.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import PageNotFoundImg from "../../assets/PageNotFound.jpg";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.pnf_container}>
      <img
        src={PageNotFoundImg}
        alt="Page not found"
        className={styles.pnf_img}
      />
      <h1 className={styles.pnf_heading}>Sorry, this page isn't avaliable</h1>
      <Button
        myFunction={() => navigate("/")}
        text="Go Home"
        color="#73ABFF"
      ></Button>
    </div>
  );
};

export default PageNotFound;

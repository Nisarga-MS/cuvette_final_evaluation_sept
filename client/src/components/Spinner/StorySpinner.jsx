import React from "react";
import styles from "./StorySpinner.module.css";

const StorySpinner = () => {
  return (
    <div
      className={styles.skeleton_spinner}
      style={{
        width: "20rem",
        height: "20rem",
      }}
    ></div>
  );
};

export default StorySpinner;

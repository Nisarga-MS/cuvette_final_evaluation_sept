import React, { useEffect } from "react";
import styles from "./Stories.module.css";
import Button from "../../Button/Button";
import Spinner from "../../Spinner/Spinner";
import StoryCard from "../../Story/StoryCard/StoryCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStoriesByUser } from "../../API/storyAPI";

const Stories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useSelector((state) => state.userauth);
  const { userStories, storiesLoading } = useSelector((state) => state.story);

  useEffect(() => {
    dispatch(getStoriesByUser(userId));
  }, []);

  if (!isAuthenticated) {
    return <h1 className={styles.heading}>Please login to see your stories</h1>;
  }

  if (storiesLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <h1 className={styles.heading}>Your Stories</h1>
      <div className={styles.Stories}>
        {userStories &&
          userStories.map((story) => (
            <StoryCard story={story} key={story._id} />
          ))}

        {userStories.length === 0 && (
          <div className={styles.no_my_stories}>
            <h1 className={styles.no_story_heading}>
              You have not added any stories yet!
            </h1>
            <Button text={"Go to Home"} myFunction={() => navigate("/")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;

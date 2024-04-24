import React, { useEffect } from "react";
import styles from "./Bookmarks.module.css";
import Button from "../../Button/Button";
import Spinner from "../../Spinner/Spinner";
import StoryCard from "../../Story/StoryCard/StoryCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookmarks } from "../../API/storyAPI";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useSelector((state) => state.userauth);
  const { bookmarks, bookmarksLoading } = useSelector((state) => state.story);

  useEffect(() => {
    dispatch(getBookmarks(userId));
  }, []);

  if (!isAuthenticated) {
    return (
      <h1 className={styles.heading}>Please login to see your bookmarks</h1>
    );
  }
  if (bookmarksLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <h1 className={styles.heading}>Your Bookmarks</h1>
      <div className={styles.bookmarks}>
        {bookmarks &&
          bookmarks.map((bookmark, index) => (
            <StoryCard story={bookmark} key={bookmark._id} />
          ))}

        {bookmarks.length === 0 && (
          <div className={styles.no_bookmarks}>
            <h1 className={styles.no_bookmark_heading}>
              You have no bookmarks yet!
            </h1>
            <Button
              text={"Go to Home"}
              myFunction={() => navigate("/")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;

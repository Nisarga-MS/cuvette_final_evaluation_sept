import React, { useEffect } from "react";
import styles from "./StoryList.module.css";
import Button from "../../Button/Button";
import StoryCard from "../StoryCard/StoryCard";
import StorySpinner from "../../Spinner/StorySpinner";
import { useDispatch, useSelector } from "react-redux";
import {
  getStories,
  getStoriesByCategory,
  getStoriesByUser,
} from "../../API/storyAPI";

const Stories = ({ category }) => {
  const dispatch = useDispatch();
  const { isSmallScreen } = useSelector((state) => state.layout);
  const { userId, isAuthenticated } = useSelector((state) => state.userauth);
  const page = useSelector((state) => state.story.page) || 1;
  const {
    stories,
    categoryStories,
    userStories,
    newStory,
    userStoriesPage,
    categoryLoading,
    storiesLoading,
  } = useSelector((state) => state.story);
  let catLimit = {
    food: 4,
    health: 4,
    travel: 4,
    movie: 4,
    education: 4,
  };

  //fetch stories on page load
  useEffect(() => {
    if (!stories && category === "All") {
      dispatch(getStories(page));
    }
    if (!stories && category !== "All") {
      dispatch(getStoriesByCategory(page));
    }
  }, []);

  //if new story added, get stories again
  useEffect(() => {
    if (newStory) {
      dispatch(getStories(page));
    }
  }, [newStory]);

  //if user is authorized then fetch user posted stories
  useEffect(() => {
    if (isAuthenticated && !userStories && userId) {
      dispatch(getStoriesByUser(userId, userStoriesPage));
    }
  }, [isAuthenticated, userId, userStories, userStoriesPage, dispatch]);

  //render stories
  const renderStories = (storyArray, isLoading, pageFunction) => (
    <>
      <div
        className={`${styles.stories}${
          isSmallScreen ? styles.stories_mob : ""
        }`}
      >
        {storyArray &&
          storyArray.map((story) =>
            isLoading ? (
              <StorySpinner />
            ) : (
              <StoryCard key={story._id} story={story} />
            )
          )}
      </div>
      {storyArray && storyArray.length > 0 && (
        <div
          style={{
            width: "100%",
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          <Button text="see more..." myFunction={pageFunction}></Button>
        </div>
      )}
    </>
  );

  //render authorized user stories
  const renderUserStories = () => (
    <>
      {userStories && userStories.length > 0 && (
        <h2 className={styles.storiesHeading}>Your Stories</h2>
      )}
      {renderStories(userStories, false, () =>
        dispatch(getStoriesByUser(userId, userStoriesPage + 1))
      )}
    </>
  );

  return (
    <div className={styles.storiesContainer}>
      {category === "All" && (
        <>
          {/* authorized user story */}
          {isAuthenticated && renderUserStories()}

          {/* fetch all stories */}
          <>
            {Object.keys(stories).map(
              (key) =>
                stories[key].length > 0 && (
                  <div key={key}>
                    <h2 className={styles.storiesHeading}>
                      Top Stories About {key}
                    </h2>
                    {renderStories(stories[key], storiesLoading, () =>
                      Object.keys(catLimit).forEach((cat) => {
                        if (cat === key) {
                          catLimit[cat] = catLimit[cat] + 4;
                          dispatch(getStories(page + 1, catLimit[cat], cat));
                        }
                      })
                    )}
                  </div>
                )
            )}
          </>
        </>
      )}

      {/* fetch story based on selected category */}
      {category !== "All" && (
        <div>
          <h2 className={styles.storiesHeading}>
            Top Stories About {category}
          </h2>
          {renderStories(categoryStories, categoryLoading, () =>
            dispatch(getStoriesByCategory(category, page + 1))
          )}
          {categoryStories.length <= 0 && (
            <h1 className={styles.no_story}>No stories found!</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Stories;

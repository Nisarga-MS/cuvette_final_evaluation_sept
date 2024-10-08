import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Story/Categories/Categories";
import Stories from "../components/Story/StoryList/StoryList.jsx";
import { categories } from "../globals.js";
import Spinner from "../components/Spinner/Spinner.jsx";
import { endRequest } from "../redux/story/storySlice";
import {
  getStoriesByCategory,
  getStories,
  getStoriesByUser,
} from "../components/API/storyAPI";

const HomePage = () => {
  const dispatch = useDispatch();
  const { userId, isAuthenticated } = useSelector((state) => state.userauth);
  const {
    storiesLoading,
    categoryLoading,
    newStory,
    userStories,
    userStoriesPage,
    newLike,
  } = useSelector((state) => state.story);

  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category !== "All") {
      dispatch(getStoriesByCategory(category, 1));
    } else {
      dispatch(getStories(1));
    }
  }, []);

  useEffect(() => {
    if (category !== "All") {
      dispatch(getStoriesByCategory(category, 1));
    } else {
      dispatch(getStories(1));
    }
  }, [category]);

  useEffect(() => {
    if (newStory) {
      dispatch(getStories(1));
      dispatch(getStoriesByUser(userId, userStoriesPage));
      dispatch(endRequest());
    }
  }, [newStory]);

  useEffect(() => {
    if (newLike) {
      dispatch(endRequest());
    }
  }, [newLike]);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <>
      <Categories
        categories={categories}
        handleCategoryClick={handleCategoryClick}
        selectedCategory={category}
      />
      {!storiesLoading && <Stories category={category} />}
      {storiesLoading && <Spinner></Spinner>}
      {categoryLoading && <Spinner></Spinner>}
    </>
  );
};

export default HomePage;

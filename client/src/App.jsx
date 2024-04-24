import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookmarkPage from "./pages/BookmarkPage";
import UserStoriesPage from "./pages/UserStoriesPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bookmarks" element={<BookmarkPage />} />
      <Route path="/my/stories" element={<UserStoriesPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;

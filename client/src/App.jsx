import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { findUser } from "./components/API/userauthAPI";
import { REGISTER, ADD_STORY, EDIT_STORY, LOGIN } from "./globals";

import HomePage from "./pages/HomePage";
import BookmarkPage from "./pages/BookmarkPage";
import UserStoriesPage from "./pages/UserStoriesPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Spinner from "./components/Spinner/Spinner";
import UserAuth from "./components/UserAuth/UserAuth";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal.jsx";
import AddStory from "./components/Story/StoryForm/StoryAdd.jsx";
import EditStory from "./components/Story/StoryForm/StoryEdit.jsx";
import ViewStory from "./components/Story/StoryDetail/StoryDetail.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { modalContent } = useSelector((state) => state.modal);
  const { loading } = useSelector((state) => state.userauth);

  useEffect(() => {
    dispatch(findUser());
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <Header />

      {modalContent === REGISTER && (
        <Modal>
          <UserAuth />
        </Modal>
      )}
      {modalContent === LOGIN && (
        <Modal>
          <UserAuth />
        </Modal>
      )}
      {modalContent === ADD_STORY && (
        <Modal>
          <AddStory />
        </Modal>
      )}
      {modalContent === EDIT_STORY && (
        <Modal>
          <EditStory />
        </Modal>
      )}
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/story/:id"
          element={
            <Modal>
              <ViewStory />
            </Modal>
          }
        />
        <Route path="/bookmarks" element={<BookmarkPage />} />
        <Route path="/my/stories" element={<UserStoriesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;

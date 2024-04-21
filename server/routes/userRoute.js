const express = require("express");
const router = express.Router();
const {
  testAPI,
  register,
  login,
  findUser,
  logout,
} = require("../controllers/user.js");
const { verifyToken } = require("../middlewares/verifyUser.js");
const {
  bookmarkedStories,
  getAllBookmarks,
} = require("../controllers/bookmark.js");

//user routes
router.get("/test", testAPI);
router.get("/find/:username", verifyToken, findUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//bookmark route
router.post("/bookmark/:id", verifyToken, bookmarkedStories);
router.get("/bookmarks/:userId", verifyToken, getAllBookmarks);

module.exports = router;

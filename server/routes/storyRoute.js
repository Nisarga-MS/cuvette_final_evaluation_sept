const express = require("express");
const router = express.Router();
const {
  addStory,
  editStory,
  getStories,
  getStoryById,
} = require("../controllers/story.js");
const { verifyToken } = require("../middlewares/verifyUser.js");
const { likedStories } = require("../controllers/like.js");

//routes
router.post("/add", verifyToken, addStory);
router.put("/edit/:id", verifyToken, editStory);
router.put("/like/:id", verifyToken, likedStories);
router.get("/getAll", getStories);
router.get("/getById/:storyId", getStoryById);

module.exports = router;

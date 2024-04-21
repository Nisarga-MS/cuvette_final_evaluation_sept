const Story = require("../models/storyModel");
const User = require("../models/userModel");

const bookmarkedStories = async (req, res) => {
  try {
    let storyId = req.params.id;
    const { userId } = req.body;

    const story = await Story.findById(storyId);
    const user = await User.findById(userId);

    if (!story) {
      return res.status(404).json({ message: "Story not found " });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //Checking previous bookmarks
    if (user.bookmarks.includes(storyId)) {
      return res
        .status(409)
        .json({ message: "Story already bookmarked", bookmarked: true });
    }
    //push storyId into user bookmarks array
    user.bookmarks.push(storyId);
    await user.save();

    //push userId into story bookmarks array
    story.bookmarks.push(userId);
    await story.save();

    res.status(200).json({
      message: "Story bookmarked and saved",
      bookmarked: true,
      bookmarks: user.bookmarks,
      story,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Oops, something went wrong", error: error.message });
  }
};

//getting all bookmarks
const getAllBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //fetch all story bookmarked by logged-in user
    const bookmarks = await Story.find({
      _id: { $in: user.bookmarks },
    }).sort({ createdAt: -1 });
    res.status(200).json({ bookmarks: bookmarks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookmarks", error: error.message });
  }
};

module.exports = { bookmarkedStories, getAllBookmarks };

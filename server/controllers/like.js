const Story = require("../models/storyModel");
const User = require("../models/userModel");

const likedStories = async (req, res) => {
  const storyId = req.params.id;
  const userId = req.body.userId;
  try {
    const story = await Story.findById(storyId);
    const user = await User.findById(userId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //Checking previous likes
    if (user.likes.includes(storyId)) {
      return res
        .status(409)
        .json({ message: "Story already liked", liked: true, story: story });
    }
    //push storyId into user likes array
    user.likes.push(storyId);
    await user.save();

    //push userId into story likes array
    story.likes.push(userId);
    await story.save();

    story.totalLikes = story.likes.length;
    res.status(200).json({
      message: "Story liked and saved",
      totalLikes: story.totalLikes,
      story: story,
      liked: true,
      likes: story.likes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Oops, something went wrong", error: error.message });
  }
};

module.exports = { likedStories };

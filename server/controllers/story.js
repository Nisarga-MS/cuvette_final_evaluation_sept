const Story = require("../models/storyModel");
const User = require("../models/userModel");
const error = require("../middlewares/error");

//adding new stories
const addStory = async (req, res, next) => {
  try {
    const { slides, addedBy } = req.body;
    if (!slides || !addedBy) {
      return res
        .status(422)
        .json("Please ensure all required fields are filled");
    }
    const story = new Story({
      slides,
      addedBy,
    });
    await story.save();
    res.status(201).json({ success: true, story });
  } catch (error) {
    next(new Error("Failed to add story"));
  }
};

// editing stories
const editStory = async (req, res, next) => {
  try {
    const { slides, addedBy } = req.body;
    if (!slides || !addedBy) {
      res.status(422).json("Please ensure all required fields are filled");
    }
    const story = await Story.findById(req.params.id);
    if (!story) {
      res.status(404).json({ error: "Story not found" });
    }
    //check json part
    //editing story
    story.slides = slides;
    story.addedBy = addedBy;
    await story.save();
    res.status(200).json({ success: true, story });
  } catch (error) {
    next(new Error("Failed to edit story"));
  }
};

//fetching stories based on criteria
const getStories = async (req, res, next) => {
  //given cateroy of  array out of which user will select
  const categories = [
    "food",
    "health and fitness",
    "travel",
    "movie",
    "education",
  ];
  const { userId, category, catLimit, cat } = req.query;

  // Pagination techique to control the number of documents to skip(0) and to limit the document display by 4 items
  let page = parseInt(req.query.page) || 1;
  let skip = 0;
  let limit = 4 * page;

  try {
    let stories = [];
    //geting logged-in user created story ?????///corret it afterwards
    if (userId) {
      stories = await Story.find({ addedBy: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    //getting all stories
    else if (category && category.toLowerCase() === "all") {
      //stories are grouped based on category filteration using object
      const groupedStories = {};

      //loop through categories array to get stories based on category and assign it to categoryStories
      for (const c of categories) {
        const categoryStories = await Story.find({
          slides: { $elemMatch: { category: c } },
        })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(cat === c ? catLimit : 4);

        //groupstories will have categories as keys, and stories array as value.
        groupedStories[c] = categoryStories;
      }
      return res
        .status(200)
        .json({ success: true, stories: groupedStories, page });
    }
    // getting stories based on  category
    else {
      stories = await Story.find({
        slides: { $elemMatch: { category: category } },
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return res.status(200).json({ success: true, stories, page });
    }

    res.status(200).json({ success: true, stories, page });
  } catch (error) {
    next(new Error("Failed to fetch stories"));
  }
};

// fetting particular stroy based on id
const getStoryById = async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const { userId } = req.query;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    let totalLikes = story.likes.length;
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        const liked = user.likes.includes(storyId);
        const bookmarked = user.bookmarks.includes(storyId);
        return res.status(200).json({
          success: true,
          story,
          liked: liked,
          bookmarked: bookmarked,
          totalLikes,
        });
      }
    } else {
      return res.status(200).json({ success: true, story, totalLikes });
    }
  } catch (error) {
    next(new Error("Failed to fetch stories"));
  }
};

module.exports = { addStory, editStory, getStories, getStoryById };

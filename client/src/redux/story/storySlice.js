import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storyLoading: false,
  storiesLoading: false,
  categoryLoading: false,
  bookmarksLoading: false,
  stories: [],
  categoryStories: [],
  bookmarks: [],
  story: null,
  userStories: null,
  bookmarked: false,
  liked: false,
  newLike: false,
  totalLikes: 0,
  newStory: false,
  page: 1,
  userStoriesPage: 1,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    createStoryRequest: (state) => {
      state.storiesLoading = true;
      state.newStory = false;
    },
    createStorySuccess: (state, action) => {
      state.storiesLoading = false;
      state.newStory = true;
    },
    createStoryFailure: (state) => {
      state.storiesLoading = false;
      state.newStory = false;
    },
    getStoriesRequest: (state) => {
      state.storiesLoading = true;
    },
    getStoriesSuccess: (state, action) => {
      state.storiesLoading = false;
      state.stories = action.payload.stories;
      state.page = action.payload.page;
    },
    getStoriesFailure: (state) => {
      state.storiesLoading = false;
    },
    fetchStoryRequest: (state) => {
      state.storiesLoading = true;
    },
    fetchStorySuccess: (state, action) => {
      state.storyLoading = false;
      state.story = action.payload.story;
      state.liked = action.payload.liked;
      state.totalLikes = action.payload.totalLikes;
      state.bookmarked = action.payload.bookmarked;
    },
    fetchStoryFailure: (state) => {
      state.storiesLoading = false;
    },
    getBookmarksRequest: (state) => {
      state.bookmarksLoading = true;
    },
    getBookmarksSuccess: (state, action) => {
      state.bookmarksLoading = false;
      state.bookmarks = action.payload;
    },
    getBookmarksFailure: (state) => {
      state.bookmarksLoading = false;
    },
    bookmarkRequest: (state) => {
      state.storyLoading = true;
    },
    bookmarkSuccess: (state, action) => {
      state.storyLoading = false;
      state.bookmarked = true;
    },
    bookmarkFailure: (state) => {
      state.storyLoading = false;
    },
    likeRequest: (state) => {
      state.storyLoading = true;
      state.newLike = false;
    },
    likeSuccess: (state, action) => {
      state.storyLoading = false;
      state.liked = true;
      state.newLike = true;
    },
    likeFailure: (state) => {
      state.storyLoading = false;
      state.newLike = false;
    },
    getStoryByUserRequest: (state) => {
      state.storiesLoading = true;
    },
    getStoryByUserSuccess: (state, action) => {
      state.storiesLoading = false;
      state.userStories = action.payload.stories;
      state.userStoriesPage = action.payload.page;
    },
    getStoryByUserFailure: (state) => {
      state.storiesLoading = false;
    },
    getCategoryStoriesRequest: (state) => {
      state.categoryLoading = true;
    },
    getCategoryStoriesSuccess: (state, action) => {
      state.categoryLoading = false;
      state.categoryStories = action.payload.stories;
      state.page = action.payload.page;
    },
    getCategoryStoriesFailure: (state) => {
      state.categoryLoading = false;
    },
    editStorySuccess: (state) => {
      state.newStory = true;
    },
    endRequest: (state) => {
      state.newStory = false;
      state.newLike = false;
    },
  },
});

export const {
  createStoryRequest,
  createStorySuccess,
  createStoryFailure,
  getStoriesRequest,
  getStoriesSuccess,
  getStoriesFailure,
  fetchStoryRequest,
  fetchStorySuccess,
  fetchStoryFailure,
  getBookmarksRequest,
  getBookmarksSuccess,
  getBookmarksFailure,
  bookmarkRequest,
  bookmarkSuccess,
  bookmarkFailure,
  likeRequest,
  likeSuccess,
  likeFailure,
  getStoryByUserRequest,
  getStoryByUserSuccess,
  getStoryByUserFailure,
  getCategoryStoriesRequest,
  getCategoryStoriesSuccess,
  getCategoryStoriesFailure,
  editStorySuccess,
  endRequest,
} = storySlice.actions;

export default storySlice.reducer;

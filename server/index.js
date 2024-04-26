const express = require("express");
const dataStore = require("./config/dataStore.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const error = require("./middlewares/error.js");

//importing routes
const userRoute = require("./routes/userRoute.js");
const storyRoute = require("./routes/storyRoute.js");

//to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;

//path settings variable
const __dirname = path.resolve();

//database connection
dataStore();

//middleware so that server can understand json format data
app.use(express.json());

//middleware for path settings
app.use(express.static(path.join(__dirname, "/client/dist")));

//to get cookie we use this middleware
app.use(cookieParser());

//to parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors settings
const corsOptions = {
  credentials: true,
  origin: FRONTEND,
};
app.use(cors(corsOptions));

//routes
app.use("/api/user", userRoute);
app.use("/api/story", storyRoute);

//path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//start server
app.listen(PORT, () => {
  console.log(`Server is up and running on port🚀 ${PORT} `);
});

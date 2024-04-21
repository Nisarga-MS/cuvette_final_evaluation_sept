const express = require("express");
const dataStore = require("./config/dataStore.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

//importing routes
const userRoute = require("./routes/userRoute.js");
const storyRoute = require("./routes/storyRoute.js");

//to load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//database connection
dataStore();

////////////////middleware//////////////////////////////
//middleware so that server can understand json format data
app.use(express.json());
//balance work////of path and do import it also

//to get cookie we use this middleware
app.use(cookieParser());

//to parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors settings
const corsOptions = {
  credentials: true,
  origin: "*",
};
app.use(cors(corsOptions));

//routes
app.use("/api/user", userRoute);
app.use("/api/story", storyRoute);

//balance of path

app.listen(PORT, () => {
  console.log(`Server is up and running on port🚀 ${PORT} `);
});

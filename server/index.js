const express = require("express");
const dataStore = require("./config/dataStore.js");
const cookieParser = require("cookie-parser");

//importing routes
const userRoute = require("./routes/userRoute.js");
const storyRoute = require("./routes/storyRoute.js");

const app = express();
const PORT = 3000;

//database connection
dataStore();



////////////////middleware//////////////////////////////
//middleware so that server can understand json format data
app.use(express.json());

//to get cookie we use this middleware
app.use(cookieParser());



app.use("/api/user", userRoute);
app.use("/api/story", storyRoute);

app.listen(PORT,()=>{
    console.log(`Server is up and running on port🚀 ${PORT} `)
})

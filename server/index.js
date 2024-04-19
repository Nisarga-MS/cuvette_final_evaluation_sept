const express = require("express");
const dataStore = require("./config/dataStore.js");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

//database connection
dataStore();

//importing routes
const userRoute = require("./routes/userRoute.js")

////////////////middleware//////////////////////////////
//middleware so that server can understand json format data
app.use(express.json());

//to get cookie we use this middleware
app.use(cookieParser());



app.use("/api/user", userRoute);

app.listen(PORT,()=>{
    console.log(`Server is up and running on port🚀 ${PORT} `)
})

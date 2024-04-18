const express = require("express");
const dataStore = require("./config/dataStore");

const app = express();

const PORT = 3000;

//database connection
dataStore();

app.get("/", (req, res) => {
  res.send("hello im backend");
});

app.listen(PORT,()=>{
    console.log(`Server is up and running on port🚀 ${PORT} `)
})

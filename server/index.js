const express = require("express");
const dataStore = require("./config/dataStore");

const app = express();

const PORT = 3000;

//database connection
dataStore();

//middleware so that server can understand json format data
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello im backend");
});

app.listen(PORT,()=>{
    console.log(`Server is up and running on port🚀 ${PORT} `)
})

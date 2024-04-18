const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello im backend");
});

app.listen(PORT,()=>{
    console.log(`Server is up and running on port🚀 ${PORT} `)
})

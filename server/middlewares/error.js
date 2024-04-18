const express = require("express");
const app = express();

app.use((error, req, res, next) => {
  const statusCode = error.status ? error.status : 500;
  res.status(statusCode);
  res.json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

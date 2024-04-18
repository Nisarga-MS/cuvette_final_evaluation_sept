const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URL = process.env.MONGO;

const dataStore = async () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("MongoDb is connected ✔");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = dataStore;

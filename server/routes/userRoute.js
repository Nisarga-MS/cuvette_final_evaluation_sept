const express = require("express");
const router = express.Router();
const testAPI = require("../controllers/user.js")

//testing route
router.get('/test',testAPI);

module.exports = router;
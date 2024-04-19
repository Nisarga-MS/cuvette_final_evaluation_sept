const express = require("express");
const router = express.Router();
const {testAPI,register,login,findUser,logout} = require("../controllers/user.js");
const verifyToken = require("../middlewares/verifyUser.js");

//user routes
router.get('/test',testAPI);
router.get("/find/:username",verifyToken, findUser);
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);


module.exports = router;
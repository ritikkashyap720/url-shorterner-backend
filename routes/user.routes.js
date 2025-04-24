const express = require("express");
const { handleLogin, handleSignin ,handleCheckAuth} = require("../controllers/user.controller");
const { checkAuthToken } = require("../middleware/authorization");
const userRouter = express.Router();

userRouter.post("/login",checkAuthToken,handleLogin)
userRouter.post("/signin",checkAuthToken,handleSignin)
userRouter.get("/checkauth",checkAuthToken,handleCheckAuth)

module.exports = userRouter;
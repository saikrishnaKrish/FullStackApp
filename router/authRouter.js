const express = require("express");
const { signUpHandler, loginHandler, logoutHandler, forgetPassword, resetPassword } = require('../controller/authController');
const authRouter = express.Router();

    authRouter.post("/signup",signUpHandler);
    authRouter.post("/login",loginHandler);
    authRouter.get("/logout",logoutHandler);
    authRouter.post("/forgetPassword",forgetPassword);
    authRouter.patch("/resetPassword/:userId",resetPassword);


module.exports=authRouter;
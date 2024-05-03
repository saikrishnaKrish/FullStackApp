const express = require("express");
const {
  getUserHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserByIdHandler,
  updateUserByIdHandler,
  checkInput,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");

const userRouter = express.Router();
userRouter.get("/search",(req,res)=>{
  console.log("router query",req.query)
})
userRouter.get("/", getUserHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.post("/", checkInput,createUserHandler);
userRouter.patch("/:id", updateUserByIdHandler);
userRouter.delete("/:id", deleteUserByIdHandler);
userRouter.post("/forgotPassword",forgotPassword);
userRouter.patch("/resetPassword/:userId",resetPassword);

module.exports = userRouter;

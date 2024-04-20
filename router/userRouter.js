const express = require("express");
const {
  getUserHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserByIdHandler,
  updateUserByIdHandler,
  checkInput,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/", getUserHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.post("/", checkInput,createUserHandler);
userRouter.patch("/:id", updateUserByIdHandler);
userRouter.delete("/:id", deleteUserByIdHandler);

module.exports = userRouter;

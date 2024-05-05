const express = require("express");
const {
  getUserHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserByIdHandler,
  updateUserByIdHandler,
  checkInput,
} = require("../controller/userController");
const {  isAdmin, isAuthorized } = require("../controller/authController");
const productValidRoles = ["admin","seller"];
const userRouter = express.Router();
userRouter.get("/search", (req, res) => {
  console.log("router query", req.query);
});
userRouter.get("/", isAdmin, getUserHandler);
userRouter.get("/:id", isAuthorized(productValidRoles), getUserByIdHandler);
userRouter.post("/", checkInput, createUserHandler);
userRouter.patch("/:id", updateUserByIdHandler);
userRouter.delete("/:id", deleteUserByIdHandler);

module.exports = userRouter;

const express = require("express");
const cookieParser = require("cookie-parser"); // parse cookie header and populate req.cookies with an object keyed by the cookie names.
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secret_key = "SomeRandomPart";
require("dotenv").config();
const User = require("./models/userModel");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((connection) => console.log("connected to DB"))
  .catch((err) => console.log(err));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.cookie("pagevisited", "home", {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: true,
    path: "/",
  });
  res.cookie("prod", "products", {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: true,
    path: "/products",
  });
  res.json({
    message: "Welcome to home page",
  });
});

app.get("/products", (req, res) => {
  console.log(req.cookies);
  res.send("req recieved!!!");
});

app.get("/products1", (req, res) => {
  console.log(req.cookies);
  res.send("req recieved!!!");
});
app.get("/clearcookie", (req, res) => {
  res.clearCookie("pagevisited");
  res.clearCookie("token");
  res.send("cleared cookie!!!");
});

app.get("/signin", (req, res) => {
  // const payload = 1234;
  try {
    jwt.sign(
      { data: req.user._id },
      secret_key,
      { expiresIn: "1h" }, // options
      function (err, token) {
        if (err) {
          throw new Error("Error in generating token");
        }
        res.cookie("token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });
        res.json({
          message: "token generated",
          data: token,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/verify", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const decoded = jwt.verify(token, secret_key);
      res.json({ message: "token verified", data: decoded });
    } else {
      res.json({
        message: "Token expired!!! Please login",
        data: null,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const userDetails = await User.find({ email: email });
    console.log(userDetails);
    if (!userDetails) {
      const userObject = req.body;
      const user = await User.create(userObject);
      res.json({ message: "user Created", data: user });
    } else {
      res.json({ message: "user email already exists!" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      console.log(
        "user password",
        user.password,
        "recieved password",
        password
      );
      if (password == undefined || password == null) {
        res.status(400).json({
          message: "Please provide password",
        });
      }
      if (user.password != password) {
        res.status(400).json({
          message: "invalid credentials",
        });
      } else {
        const token = jwt.sign({ data: user }, secret_key, {
          expiresIn: "1hr",
        });
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 });
        res.send({
          message: "user logged in",
          data: user,
          token: token,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

const protectedRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, secret_key);
    const user = await User.findById(decoded.data);
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err.message);
  }
};

app.get("/user", protectedRoute, (req, res) => {
  res.json({
    message: "user data",
    data: req.user,
  });
});

//   app.get(""/)
app.listen(3002, () => console.log("running on port", 3002));

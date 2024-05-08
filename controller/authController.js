const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { emailBuilder } = require("../nodemailer");
const userModel = require("../models/userModel");

const { SECRET } = process.env;

/** authentication related handlers */

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const signUpHandler = async (req, res) => {
  try {
    const userDetails = req.body;
    let newUser = await userModel.create(userDetails);
    res.status(201).json({
      message: "user created successfully!",
      user: newUser,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      let areEqual = user.password == password;
      console.log(areEqual);
      if (areEqual) {
        //user is authenticated
        //sending the token
        //adding id of the user as payload

        const token = jwt.sign({ id: user["_id"] }, SECRET, {
          expiresIn: "1h",
        });

        console.log("token created", token);
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
        console.log("data");

        return res.status(200).json({
          status: "success",
          //  message:data,
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
            _id: user._id,
          },
        });
      } else {
        console.log("err", err);
        res.status(404).json({
          status: "failure",
          message: "email or password is incorrect",
        });
      }
    } else {
      res.status(404).json({
        status: "Failure",
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: "email or password is incorrect",
    });
  }
};

const forgetPassword = async (req, res) => {
  // 2. find user by email
  // 3. generate a random token
  // 4. save token in database
  // 5. save expiry time in database
  // 5. send email to user with token
  try {
    const { email } = req.body;
    const userDetails = await userModel.findOne({ email });
    console.log(userDetails);
    if (!userDetails) {
      res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    } else {
      const token = otpGenerator();
      userDetails.token = token;
      userDetails.otpExpiry = Date.now() + 5 * 60 * 1000; //5 mins
      console.log("updated user", userDetails);
      await userDetails.save();
      emailBuilder(user.email, "Reset Password", `Your OTP is ${token}`)
        .then(() => {
          console.log("email sent successfully");
          res.status(200).json({
            status: "success",
            message: "email sent successfully",
            data: user,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, token } = req.body;

    const { userId } = req.params;
    const userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res.json(404).json({
        status: "failure",
        message: "user email doesnt exist",
      });
    }

    const isCheckPwd = token == userDetails.token;

    if (!isCheckPwd) {
      // 3. verify the validity of token
      return res.status(404).json({
        status: "failure",
        message: "Invalid token",
      });
    } else {
      if (userDetails.otpExpiry < Date.now()) {
        // check expiry time of the token
        return res.status(400).json({
          status: "fail",
          message: "token expired",
        });
      } else {
        // 4. update password in database
        userDetails.password = password;
        userDetails.token = undefined;
        userDetails.otpExpiry = undefined;
        await userDetails.save();
        return res.status(200).json({
          status: "success",
          message: "password updated successfully",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const protectedRoute = async (req, res, next) => {
  console.log("req cookies", req.cookies);
  // get token from cookies
  // verify token
  // get user from database
  // if user exists then call next
  try {
    const { token } = req.cookies;
    console.log("token", token);
    if (token == null) {
      return res.status(500).json({
        status: "failure",
        message: "user not logged In!! Please login again",
      });
    }
    const decoded = jwt.verify(token, SECRET);
    if (decoded) {
      const userId = decoded.id;
      req.userId = userId;
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};
const isAdmin = async (req, res, next) => {
  // get userId from req.userId
  // authorise user to see the user data
  // get user from database
  // if user.role === "admin" then call next
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Error("Please login !!!");
    }
    const userDetails = await userModel.findOne({ _id: userId });
    if (userDetails.role == "admin") {
      next();
    }
  } catch (err) {
    return res.status(404).json({
      status: "failure",
      message: err.message,
    });
  }
};

const isAuthorized = (allowedRoles) => {
  // return function which will be called by express
  // get userId from req.userId
  // get user from database
  // if user's roles fall in the allowedRoles then call next
  return async function (req, res, next) {
    const userId = req.userId;
    console.log(userId);
    const userDetails = await userModel.findOne({ _id: userId });
    console.log(userDetails);
    if (allowedRoles.includes(userDetails.role)) {
      next();
    } else {
      return res.status(401).json({
        status: "failure",
        message: "you are not authorized to perform this action",
      });
    }
  };
};

const logoutHandler = async (req, res) => {
  res.clearCookie("token");
  res.status("200").json({
    status: "success",
    message: "logged out successfully",
  });
};

module.exports = {
  signUpHandler,
  loginHandler,
  forgetPassword,
  resetPassword,
  protectedRoute,
  isAdmin,
  isAuthorized,
  logoutHandler,
  otpGenerator,
};

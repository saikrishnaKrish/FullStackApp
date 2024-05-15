const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { emailBuilder } = require("../nodemailer");
const userModel = require("../models/userModel");

const { SECRET } = process.env;
const bcrypt = require('bcrypt');
/** authentication related handlers */

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const signUpHandler = async (req, res) => {
  try {
    const userDetails = req.body;
    console.log("user details",userDetails);
    // Validate user input
    let checkUserExists = await userModel.findOne({email:userDetails.email});
    
    console.log("user checkUserExists",checkUserExists);
    if(checkUserExists && Object.keys(checkUserExists).length > 0){
      return res.status(200).json({
        status:"success",
        message:"user already registered with us!"
      })
    }
    
    const validCheck = isValidUser(userDetails);
    console.log("user checks",validCheck);

    if (validCheck != true) {
      return res.status(400).json({
        status: "failure",
        message: validCheck,
      });
    }

    let newUser = await userModel.create(userDetails);

    // to, subject, text,template)
    const msg="Thanks for sigining with us use:FREEUSE for getting 10% discount"
    emailBuilder(newUser.email,`Welcome ${newUser.name}`,msg,msg)
    
    res.status(201).json({
      message: "Thanks for registering with us!!!",
      user: newUser,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      status: "failure",
    });
  }
};

// Function to validate user input
const isValidUser = (userDetails) => {
  // Regular expression to validate phone number (10 digits)
  const phoneRegex = /^\d{10}$/;
  let checkMsg=""
  // Check if phone is a valid number
  if (!phoneRegex.test(userDetails.phone)) {
    checkMsg +="Phone number must be a 10-digit number";
  }

  // Check if password and confirm password have at least 8 characters
  if (userDetails.password.length < 8 || userDetails.confirmPassword.length < 8) {
    checkMsg +=","+"Password and confirm password should have a minimum length of 8 characters";
  }

  // Check if password and confirm password match
  if (userDetails.password !== userDetails.confirmPassword) {
    checkMsg+","+"Password and confirm password do not match";
  }
  if (checkMsg) {
    return checkMsg.trim(); // Remove trailing space and return error messages
  }

  return true; // Return true if all validations pass
};



const loginHandler = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({email: email });

    if (user) {
      const checkEqual = await bcrypt.compare(password,user.password)

      if (checkEqual) {
        //user is authenticated
        //sending the token
        //adding id of the user as payload

        const token = jwt.sign({ id: user["_id"] }, SECRET, {
          expiresIn: "1h",
        });

        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });


        return res.status(200).json({
          status: "success",
          //  message:data,
          user: {
            name: user.name,
            email: user.email,
            authToken:token,
            role: user.role,
            _id: user._id,
          },
        });

      } else {
        res.status(404).json({
          status: "failure",
          message: "email or password is incorrect !!!",
        });
      }
    } else {
      res.status(404).json({
        status: "Failure",
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: err.message
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
  res.clearCookie('token');
 return res.status("200").json({
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

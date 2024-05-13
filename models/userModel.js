const mongoose = require("mongoose");
const bcrypt= require('bcrypt');
/**
 *  require vs import
 *  import is ES6 module
 *  require is commonjs module
 *  import is done at compilation time
 *  require is done at run time
 *
 */

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email must be unique"],
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
    validate: {
      validator: function (v) {
        return v.toString().length == 10;
      },
      message: "phone number should have min length 10 chars",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    // required: true,
    minlength: 8,
    // validate: {
    //   validator: function () {
    //     return this.password === this.confirmPassword;
    //   },
    //   message: "password  and confirm password should be same",
    // },
  },
  role:{
    type:String,
    default:"user"
  },
  token:String,
  otpExpiry:Date,
  role:{
    type:String,
    default:"user"
  },
  bookings:{
    type:[mongoose.Schema.ObjectId],
    ref:"booking"
  }
});



const validRoles=["admin","user","sales"]

userSchema.pre("save",async function(next){
  if(this.password!=this.confirmPassword){
   return next(new Error("Password and confirm Password should be same"));
  } 
  this.confirmPassword=undefined;
  
  const hashPassword = await bcrypt.hash(this.password,12);
  console.log(hashPassword);
  this.password=hashPassword;

  if(this.role){
    const isValid = validRoles.includes(this.role);
        if(!isValid){
        return next(new Error(`InvaDlid role,${this.role}`));
        }
  }else{
    this.role="user"
  }

  next()
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

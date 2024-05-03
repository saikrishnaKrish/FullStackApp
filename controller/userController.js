const userModel= require("../models/userModel");

const {getAllFactory,createFactory,
    getElementByIdFactory,
    updateElementByIdFactory,
    deleteElementByIdHandler,
    checkInput} =require("../utils/CRUDfacotry");

const getUserHandler = getAllFactory(userModel);
const getUserByIdHandler = getElementByIdFactory(userModel);
const createUserHandler = createFactory(userModel);
const deleteUserByIdHandler = deleteElementByIdHandler(userModel);
const updateUserByIdHandler = updateElementByIdFactory(userModel);


const { emailBuilder } = require("../nodemailer");

// const userModel = require("../models/userModel");

const otpGenerator=()=>{
  return Math.floor(100000+Math.random()*900000);
}

const forgotPassword = async (req,res)=>{
  //find user by Email
  // generate a random token
  // save token in database
  // save expiry time in database
  // send email to user with token

  try{
      const {email}=req.body;

      const user = await userModel.findOne({email});
      console.log(user);
      if(!user){
        res.status(404).json({
          status:"fail",
          message:"user not found"
        })
      } else{
        const token = otpGenerator();
        console.log("token",token);
        user.token=token;
        user.otpExpiry = Date.now()+5*60*1000//5 minutes
        await user.save();
        console.log("updated user",user);
        
        emailBuilder(user.email,"Reset Password",`Your otp is ${token}`)
        .then(()=>{
          console.log("email sent successfully");
          res.status(200).json({
            status:"success",
            message:"email sent successfully",
            data:{
                name: user.name,
                email:user.email,
                phone: user.phone
            }          
          })
        })
        .catch(
            (err)=>{
                console.log(err.message)
            }
        )
      }



  }catch(err){
    console.log(err)
  }

}

// const userSchema = require("../models/userModel");


const resetPassword = async (req,res)=>{
 try{
   const {token,email,password} =req.body;
   const {userId} = req.params;
   console.log(req.body)
   const user = await userModel.findById(userId);
   if(!user){
     return res.status(404).json({
        status:"fail",
        message:"user not found"
      })
   }
   else{
      //3. verify the validity of token
      if(user.token!==token.toString()){
        console.log(user.token,"tokken sent",token)
          return res.status(400).json({
            status:"fail",
            message:"invalid token"
          })
      }
      else{
        //check expiry of the time
          if(user.otpExpiry < Date.now()){
            return res.status(400).send({
              status:"fail",
              message:"token expired"
            })
          }else{
            //4. update the password in database
            user.password=password;
            user.token=undefined;
            user.otpExpiry=undefined;
            await user.save();
            console.log(user)
            return res.status(200).json({
              status:"success",
              message:"password updated successfully",
              data:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                role:user.role
            }  
            })
          }
      }

   }
     
 }catch(err){
      console.log(err)
    }
}

module.exports={
    getUserByIdHandler,
    getUserHandler,
    createUserHandler,
    deleteUserByIdHandler,
    updateUserByIdHandler,
    checkInput,
    resetPassword,
    forgotPassword
}


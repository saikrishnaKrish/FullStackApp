const mongoose = require("mongoose");
/**
 *  require vs import
 *  import is ES6 module
 *  require is commonjs module
 *  import is done at compilation time
 *  require is done at run time
 * 
 */


const userSchema=new mongoose.Schema({
        name: {
            type: String,
            required: [true,"name is required"],
          },
          email: {
            type: String,
            required: true,
            unique: [true,"email must be unique"],
          },
          phone: {
            type: Number,
            required: true,
            unique: true,
            minlength: 10,
            validate:{
                validator:function(v){
                    return v.toString().length==10
                },
                message:"phone number should have min length 10 chars"
            }
          },
        password:{
            type:String,
            required:true,
            minlength:8
        },
        confirmPassword:{
            type:String,
            required:true,
            minlength:8,
            validate:{
                validator:function() {
                      return this.password===this.confirmPassword;
                },
                message:"password  and confirm password should be same"
            }
        }
})



// userSchema.pre("save", async (next)=>{
//   try{
//     const isEmailExists = await userModel.findOne({ email: this.email });
//     if(isEmailExists){
//       throw new Error("Email already Exists!!!");
//     } 
//     next();
//     }
//   catch(err){
//     next(err)
//   }
// })




const userModel= mongoose.model("user",userSchema);
module.exports=userModel;
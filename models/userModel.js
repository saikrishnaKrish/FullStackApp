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
            required: true,
          },
          email: {
            type: String,
            required: true,
            unique: true,
          },
          phone: {
            type: Number,
            required: true,
            unique: true,
            minlength: 10,
            validate:{
                validator:function(){
                    return this.phone.length<10
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






const userModel= mongoose.model("user",userSchema);
module.exports=userModel;
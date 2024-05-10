import { useState } from "react"
import urlConfig from "../urlConfig";

const SignInPage = ({handleTabChange}) => {
  const initialData = {
      name:"",
      phone:"",
      email:"",
      password:"",
      confirmPassword:"",
      enableBtn:true
  }
  const [registrationData, setRegistrationData] = useState(initialData);
  
    const handleInputChange = (e)=>{
    const {name,value}=e.target
      setRegistrationData((prevData)=>({...prevData,
      [name]:value
      }))

      const isAnyValueEmpty = Object.values(registrationData).some(ele => ele === "");
      setRegistrationData((info)=>({...info,enableBtn:isAnyValueEmpty}))
    }
   

    const handleRegistration = async()=>{
      const  data = await fetch(urlConfig.SIGNUP_URL,{
        method:"POST",
        body:JSON.stringify(registrationData),
        headers:{
          "content-Type":"application/json",
        },
        cridentials:true
      });
      const info = await data.json();
      if(info.status=="success"){
        console.log(info);
      } else{
        handleTabChange(null, "1")
        alert(info.message)
      }
      setRegistrationData(initialData);
    }
  return (
    <div className="main-container">
      <h4 className="signup-label">Register with Us !!!</h4>
      <form className="signup-form">
      <fieldset>
          <label>Name<span className="required-field">*</span></label>
          <input type="text" name="name" required value={registrationData.name} onChange={handleInputChange} />
        </fieldset>
        <fieldset>
          <label>Phone<span className="required-field">*</span></label>
          <input type="phone" name="phone" required value={registrationData.phone}  onChange={handleInputChange} />
        </fieldset>
       <fieldset>
          <label>Email<span className="required-field">*</span></label>
          <input type="email" name="email" required value={registrationData.email} onChange={handleInputChange} />
        </fieldset>
        <fieldset>
          <label>Password<span className="required-field">*</span></label>
          <input type="password" name="password" required value={registrationData.password} onChange={handleInputChange} />
        </fieldset>
        <fieldset>
          <label>Confirm password<span className="required-field">*</span></label>
          <input type="password" name="confirmPassword" required value={registrationData.confirmPassword} onChange={handleInputChange} />
        </fieldset>
      </form>
        <button className="signin-btn" 
        disabled={registrationData.enableBtn}
        onClick={handleRegistration}> Sign Up</button>
     
     <br/>
      <span>
        {" "}
        Do you have account?{" "}
        <button
          onClick={(event) => handleTabChange(event, "2")}
          className="Login-btn"
        >
          Login
        </button>
      </span>

    </div>
  )
}

export default SignInPage
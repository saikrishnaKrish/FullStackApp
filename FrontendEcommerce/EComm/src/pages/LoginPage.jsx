import { useState } from "react";
import axios from "axios";
import url from "../urlConfig";
import {useAuthContext} from '../contexts/AuthContext'
import { Navigate, useNavigate } from "react-router-dom";
import urlConfig from "../urlConfig";

const LoginPage = ({ handleTabChange }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    enableBtn:true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((info) => ({ ...info, [name]: value }));
    
    if(loginInfo.email.trim()!="" && loginInfo.password.trim()!=""){
      setLoginInfo((info)=>({...info,enableBtn:false}))
    }
  };
  const {userDetails,setUserDetails} = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async () => {






    try{
      const data = await fetch(urlConfig.LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
        credentials: 'include'
      });
      const user = await data.json();
      
      if(user.status=="success"){
      setUserDetails(user.user)
      navigate("/")
      }
      else{
       throw new Error(user.message)
      }  
      console.log(user);
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="main-container">
      <h4 className="login-label">Enter your cridentials</h4>
      <form className="login-form">
        <fieldset>
          <label>Email<span className="required-field">*</span></label>
          <input type="email" name="email" required onChange={handleInputChange} />
        </fieldset>
        <fieldset>
          <label>password<span className="required-field">*</span></label>
          <input type="password" name="password" required onChange={handleInputChange} />
        </fieldset>
      </form>

      <button className="login-btn" onClick={handleLogin}
        disabled={loginInfo.enableBtn}
      >
        {" "}
        Login{" "}
      </button>
      <br />
      <span>
        {" "}
        Don't you have account?{" "}
        <button
          onClick={(event) => handleTabChange(event, "2")}
          className="signUp-btn"
        >
          Signup
        </button>
      </span>
    </div>
  );
};

export default LoginPage;

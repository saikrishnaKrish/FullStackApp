import { useState } from "react";
import axios from "axios";
import url from "../urlConfig";
import {useAuthContext} from '../contexts/AuthContext'
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = ({ handleTabChange }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((info) => ({ ...info, [name]: value }));
  };
  const {userDetails,setUserDetails} = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      
      const data = await fetch("http://localhost:3000/api/auth/login", {
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
    <div className="login-contaier">
      <h4 className="login-label">Enter your cridentials</h4>
      <form className="login-form">
        <fieldset>
          <label>Email</label>
          <input type="email" name="email" onChange={handleInputChange} />
        </fieldset>
        <fieldset>
          <label>password</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </fieldset>
      </form>

      <button className="login-btn" onClick={handleLogin}>
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

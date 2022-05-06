import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "../App.css";
import { GoogleLogin } from 'react-google-login';
import axios from "axios"



const Login = () => {
  let token;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [userToken, setUserToken] = useState();
  const nav = () => navigate("/feed");

  const handleLogin = async (e) => {
    const res = await fetch("http://localhost:8800/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    token = data.token;


   

    localStorage.setItem("userId", JSON.stringify(data.user._id));
    localStorage.setItem("token", JSON.stringify(data.token));
    setUserToken(data.token);
    if (data.token) {
      nav();
    }
  };

  console.log(userToken);


  const responseGoogle = (res) => {
    // console.log(res.Lu.Bv);
    axios
      .post("http://localhost:8800/user/google-login", { email: res.Lu.Bv })
      .then((res) => {
        if (res.data.status !== false) {
          if (res !== "user not found" && res.data.token !== "undefined") {
            console.log(res);
            res.data.token &&
              localStorage.setItem("token", JSON.stringify(res.data.token));
            res.data.token &&
              localStorage.setItem("userId", JSON.stringify(res.data.user._id));
            // props.setToken(res.data.token);
            // props?.handleClick("Login Successful !");
            navigate("/feed");
          }
        } else {
          alert("Gmail Account Not Found");
        }
      });
  };
 

  return (
    <div className="login">
      <div className="loginbox">
        <h1>Login</h1>
        <TextField
          variant="outlined"
          label="Email"
          sx={{ width: 390 }}
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></TextField>
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Password"
          id="pswd"
          sx={{ width: 390 }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
        />
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <br />
        <br />
        <br />

        {/* <p>Don't have an Account ?  <a href='http://localhost:3000/sign-up'> SignUp </a></p> */}
      </div>
      <GoogleLogin
               // clientId="258096711456-f6igfuafn2n9c5s14ch12tos4vag8jmj.apps.googleusercontent.com" 
                 clientId="1069481089822-bfacd3vd7f547gss8cn0o9b49v32l76q.apps.googleusercontent.com"

                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
    </div>
  );
};

export default Login;

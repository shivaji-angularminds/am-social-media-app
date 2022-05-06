import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "../App.css";


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
    </div>
  );
};

export default Login;

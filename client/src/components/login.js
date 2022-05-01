import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import '../App.css'

const Login = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const signupData=JSON.parse(localStorage.getItem('signupData'));
    console.log("signupData",signupData);

    const validateLogin=(loginData)=>{
      if (!loginData.email) {
        alert("Email is Required");
        return false;
      }
      else if (!loginData.password) {
        alert("Password is Required");
        return false;
      }
      else if(loginData.email !== signupData.email)
      {
        alert("Email is not Match");
        return false;
      }
      else if(loginData.password !== signupData.password)
      {
        alert("Password is not Match");
        return false;
      }
      else{
        return true;
      }
    }

    const login=()=>{
      const  loginData={
            email:email,
            password:password
        }

        if (validateLogin(loginData) === false) {
          setEmail('');
          setPassword('');
        }
        else {
          alert(`${email} LoggedIn Successfully`)
          navigate('/feed')
        }

        
    }
    const goWithGoogle=()=>{
      console.log("Choose Google Account");
    }
  return (
    <div className='login'>
      <div className='loginbox'>
        <h1>Login</h1>
        <TextField variant='outlined' label="Email" sx={{ width: 390 }} id="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></TextField><br /><br />
        <TextField variant='outlined' label="Password" id='pswd' sx={{ width: 390 }} value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" /><br /><br />
        <Button variant='contained' color='primary' onClick={login}>Login</Button> &nbsp; &nbsp;
        <Button variant='outlined' color='primary' onClick={goWithGoogle}>Continue with Google Account</Button> <br/> <br/>
        <a href='http://localhost:3000/signup'>Create New Account</a>
      </div> 
    </div>
  )
}

export default Login;
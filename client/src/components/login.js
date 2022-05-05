import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import '../App.css'

const Login = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin = async (e) => {
      e.preventDefault();
      const  loginData={
            email:email,
            password:password 
        }
        console.log("loginData",loginData);

         // --------------------- post data from signup form ---------------------------------
         const res= await fetch("http://localhost:8800/user//login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
             email, password
          })
        });

        const data = await res.json();
        console.log("data",data);
       
        localStorage.setItem('userId',JSON.stringify(data.user._id));
        localStorage.setItem('token',JSON.stringify(data.token));

        const userId=JSON.parse(localStorage.getItem('userId'));

        if(data.user) 
        {
          window.alert(data.message);
        } 
        else {
          window.alert(data);
        }
    //---------------------------------------------------------------------------------
      navigate(`/feed/${userId}`)
        
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
        <Button variant='contained' color='primary' onClick={handleLogin}>Login</Button> &nbsp; &nbsp;
        <Button variant='outlined' color='primary' onClick={goWithGoogle}>Continue with Google Account</Button> <br/> <br/>
        <a href='http://localhost:3000/signup'>Create New Account</a>
      </div> 
    </div>
  )
}

export default Login;
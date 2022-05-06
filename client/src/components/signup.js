import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const SignUp = () => {
  const navigate = useNavigate();
  const [fname, setFname]=useState("");
  const [lname, setLname]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  let [user,setUser]=useState([]);

  const signUpDone = async (e) => {
    e.preventDefault();
    const newUser={
      firstname:fname,
      lastname:lname,
      email:email,
      password:password
    }
    //console.log(newUser);
    setUser([...user,newUser]);

    // --------------------- post data from signup form ---------------------------------
        const res= await fetch("http://localhost:8800/user/sign-up",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            firstname:fname, lastname:lname, email, password
          })
        });

        const data = await res.json();
        console.log("data",data);

        if(data.details)
        {
          window.alert(data.details[0].message);
        } 
        else {
          window.alert(data.message);
        }
        login()
    //---------------------------------------------------------------------------------

  }
  const login = () => {
    navigate('/login')
  }

  return (
    <div className='signup'>
      <form method='POST'>
      <div className='signupbox'>
        <h1>SignUp New Member</h1>
        <TextField variant='outlined' label="First Name" sx={{ width: 300 }} id="fname" name="FirstName"  value={fname} onChange={(e)=>{setFname(e.target.value)}} required></TextField><br /><br />
        <TextField variant='outlined' label="Last Name" sx={{ width: 300 }} id="lname" name="LastName" value={lname} onChange={(e)=>{setLname(e.target.value)}} required></TextField><br /><br />
        <TextField variant='outlined' label="Email" sx={{ width: 300 }} id="email" name="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required></TextField><br /><br />
        <TextField variant='outlined' label="Password" id='pswd' sx={{ width: 300 }} name="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" /><br /><br />
        <Button variant='contained' color='primary' onClick={signUpDone}>Sign Up</Button> &nbsp; &nbsp;
        <Button variant='contained' color='primary' onClick={login}>Login</Button>
      </div>
      </form>
    </div>
  )
}

export default SignUp
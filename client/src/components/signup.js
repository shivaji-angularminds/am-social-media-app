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

  const validateSignup = (user) => {
    // console.log("fname",user.firstName)
    // console.log("lname",user.lastName)
    // console.log("email",user.email)
    // console.log("password",user.password)
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const pswdregex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

    // if (!user.firstName) {
    //   alert("First Name is Required");
    //   return false;
    // }
    // else if (!user.lastName) {
    //   alert("Last Name is Required");
    //   return false;
    // }
    // else if (!user.email) {
    //   alert("Email is Required");
    //   return false;
    // }
    // else if (!regex.test(user.email)) {
    //   alert("Plz Enter Valid Email");
    //   return false;
    // }
    // else if (!pswdregex.test(user.password)) {
    //   alert("Plz Enter Valid Password");
    //   return false;
    // }
    // else {
    //   return true;
    // }



  }

  const signUpDone = async (e) => {
    e.preventDefault();
    const newUser={
      firstname:fname,
      lastname:lname,
      email:email,
      password:password
    }
    console.log(newUser);
    setUser([...user,newUser]);
    console.log("temp",user);

    if (validateSignup(user) === false) {
      setFname('');
      setLname('');
      setEmail('');
      setPassword('');
    }
    else {
      alert(`${fname} SignUp Successfully`)
      // localStorage.setItem('signupData', JSON.stringify(signupData));
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

        if(data.status === 500 || !data)
        {
          window.alert("Registration Failed");
          console.log("Registration Failed");
        } else {
          window.alert("Registration Successful");
          console.log("Registration Successful");
        }
    }

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
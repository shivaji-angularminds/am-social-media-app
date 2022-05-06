import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
//import GoogleAccount from './googleAccount';
import '../App.css'
import { GoogleLogin } from "react-google-login";


const CLIENT_ID = "218376613496-0u6bnm5sd57iuq28smoe8d5hctp7e49l.apps.googleusercontent.com" 

const Login = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[showLogin,setShowLogin] = useState(true)

    const handleLogin = async (e) => {
      e.preventDefault();
      const  loginData={
            email:email,
            password:password 
        }
       // console.log("loginData",loginData);

         // --------------------- post data from login form ---------------------------------
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
      navigate(`/feed`);
        
    }

    const responseGoogleSuccess =(res) =>
      console.log("login-----" ,res.tokenId)
    
    
  return (
    <div className='login'>
      <div className='loginbox'>
        <h1>Login</h1>
        <TextField variant='outlined' label="Email" sx={{ width: 390 }} id="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></TextField><br /><br />
        <TextField variant='outlined' label="Password" id='pswd' sx={{ width: 390 }} value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" /><br /><br />
        <Button variant='contained' color='primary' onClick={handleLogin}>Login</Button><br/><br/>
        <br/>
{ showLogin  &&(
        <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign In with Google"
              onSuccess={responseGoogleSuccess}
              // onFailure={responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />)
     }
      <p>Don't have an Account ?  <a href='http://localhost:3000/signup'> SignUp </a></p>
      </div> 
    </div>
  )
}

export default Login;
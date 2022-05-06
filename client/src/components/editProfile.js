import React, { createRef, useEffect, useState } from 'react'
import { Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio} from '@mui/material'
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";
import Header from './header'
import {Navigate} from "react-router-dom"
import axios from 'axios';
import ChangePassword from './changePassword';


const EditProfile = () => {
  const userId=JSON.parse(localStorage.getItem('userId'));
  //console.log(userId)

 const token=JSON.parse(localStorage.getItem('token'));
 // console.log(token);

  //---------------------------- GET SPECIFIC USER DETAILS ---------------------------

  const getUserDetails= () =>{
   let res =  fetch(`http://localhost:8800/user/${userId}`, {
      method: "get",
      headers: new Headers({
        Authorization: token,
      }),
    }) 
      .then((res) =>  res.json())
      .then((data) => {
        localStorage.setItem('userDetails',JSON.stringify(data));
      });
  }

  useEffect(()=>{
    getUserDetails();
  })
 
//----------------------------------------------------------------------------------
const userDetails=JSON.parse(localStorage.getItem('userDetails'));
  const [picture,setPicture]=useState(userDetails.profilePicture)
  const [username, setUsername] = useState(userDetails.firstname);
  const [bio, setBio] = useState(userDetails.bio);
  const [gender, setGender] = useState(userDetails.gender);
  const [dob, setDob] = useState(userDetails.dob);
  const [mobile, setMobile] = useState(userDetails.mobile);
  const [isSucces, setSuccess] = useState(null);


  // ------------------ UPLOAD NEW PROFILE PICTURE ------------------------

  const addPicture=async(e)=>{
    const singleFile=e.target.files[0];
    console.log("singleFile",singleFile);
    setPicture(singleFile)
      //Check if any file is selected or not
        //If file selected then create FormData
        let data = new FormData();
        data.append('image', singleFile);
        data.append('userId',userId)
       // console.log(data)
                let res = await fetch(
          `http://localhost:8800/user/edit-profile/editProfilePicture/${userId}`,
          {
            method: 'PUT',
            headers: {
              'authorization': token
            },
            body: data,
          }
        );
        let responseJson = await res.json();
        alert(responseJson.message);
 }

 // ------------------------- EDIT CURRENT PROFILE PICTURE ---------------------
  const editPicture = async (e) => {
       // console.log("picture",picture)
        let data = new FormData();
        data.append('image', picture);
        data.append('userId',userId)
       // console.log(data)
                let res = await fetch(
          `http://localhost:8800/user/edit-profile/editProfilePicture/${userId}`,
          {
            method: 'PUT',
            headers: {
              'authorization': token
            },
            body: data,
          }
        );
        let responseJson = await res.json();
        alert(responseJson.message);
  }

  //-----------------------REMOVE PROFILE PICTURE --------------------------
  const removePicture = async() => {
    //console.log("picture",picture)
    let data = new FormData();
    data.append('userId',userId)
   // console.log(data)
            let res = await fetch(
      `http://localhost:8800/user/edit-profile/deleteProfilePicture/${userId}`,
      {
        method: 'PUT',
        headers: {
          'authorization': token
        },
        body: data,
      }
    );
    let responseJson = await res.json();
    alert(responseJson.message);
  }
  const editProfile = async (e) => {
      e.preventDefault();
      //getUserDetails();
      
      const formData= new FormData();

      formData.append( 'image',picture);
      formData.append( 'gender',gender);
      formData.append( 'dob',dob);
      formData.append( 'userId',userId);
      formData.append( 'bio',bio);
      formData.append( 'username',username);
      formData.append( 'mobile',mobile);

       // console.log(data)
                let res = await fetch(
          `http://localhost:8800/user/edit-profile/${userId}`,
          {
            method: 'PUT',
            headers: {
              'authorization': token
            },
            body: formData,
          }
        );
        let responseJson = await res.json();
        alert(responseJson.message);
  
  }
  console.log(token)
  if(!token){
    return <Navigate to="/login" />
  }

  return (
    <div className='profile-container'>
      <Header /><br />
      <div className='editform'>
        <form>
          <h1>Edit Profile</h1>
          <div className='profile-picture'>
            <label>Profile picture:</label>
            {isSucces !== null ? <h4> {isSucces} </h4> :null }
            <Button component="label" > Add<input type="file" onChange={addPicture} hidden /></Button>
            <Button onClick={editPicture}>Edit</Button>
            <Button onClick={removePicture}>Remove</Button>
          </div>
          <TextField variant='outlined' label="UserName" sx={{ width: 270 }} id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} required></TextField><br /><br />
          <TextField variant='outlined' label="Bio" sx={{ width: 270 }} id="bio" value={bio} onChange={(e) => { setBio(e.target.value) }} required></TextField><br /><br />
          <FormControl>
                            <label className='label'>Gender:</label>
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"
                                value={gender}
                                id='gen'>
                                <FormControlLabel value="female" onClick={(e) => { setGender(e.target.value) }} control={<Radio />} label="Female" />
                                <FormControlLabel value="male" onClick={(e) => { setGender(e.target.value) }} control={<Radio />} label="Male" />
                                <FormControlLabel value="other" onClick={(e) => { setGender(e.target.value) }} control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl><br /><br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Birthdate"
              value={dob}
              sx={{ width: 300 }}
              fullWidth
              onChange={(e) => { setDob(e) }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider><br /><br />
          <TextField variant='outlined' label="Mobile" sx={{ width: 270 }} id="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} required></TextField><br /><br />
          <Button variant='contained' onClick={editProfile}>Edit</Button>
        </form>
      </div>
    </div>
  )
}
export default EditProfile;
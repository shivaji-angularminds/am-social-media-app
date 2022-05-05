import React, { createRef, useEffect, useState } from 'react'
import { Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio} from '@mui/material'
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";
import Header from './header'
import axios from 'axios';
import ChangePassword from './changePassword';
const EditProfile = () => {
  const userId=JSON.parse(localStorage.getItem('userId'));
  //console.log(userId)
 const token=JSON.parse(localStorage.getItem('token'));
 // console.log(token);
   const loginData=JSON.parse(localStorage.getItem('loginData'));
  //console.log(loginData)
  const [picture,setPicture]=useState()
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [isSucces, setSuccess] = useState(null);
  const [userInfo,setUserInfo]=useState()


  useEffect(()=>{
         fetch(`http://localhost:8800/user/${userId}`,{ 
          method: 'get', 
          headers: new Headers({
            'Authorization': token, 
         
          })
       
        }).then((res)=>res.json()).then((data)=>{
          setUserInfo(data)
         })
  },[username,picture])


  console.log(userInfo)

  // ------------------ UPLOAD NEW PROFILE PICTURE ------------------------
  const addPicture=async(e)=>{
    const singleFile=e.target.files[0];
    console.log("singleFile",singleFile);
      //Check if any file is selected or not
        //If file selected then create FormData
        let data = new FormData();
        data.append('image', singleFile);
        data.append('userId',userId)
        console.log(data)
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
        console.log("responseJson")
 }
 // ------------------------- EDIT CURRENT PROFILE PICTURE ---------------------
  const editPicture = (e) => {
    const editImage= async () =>{
      const singleFile=e.target.files[0]
      const data = new FormData();
        data.append('userId',userId)
        data.append('image', singleFile);
      let res = await fetch(
        `http://localhost:8800/user/edit-profile/editProfilePicture/${userId}`,
        {
          method: 'PUT',
          body: {userId, data},
          headers: {
            'authorization': token
          },
        }
      );
      let responseJson = await res.json();
      console.log("edit picture",responseJson);
    }
    alert("profile picture edited successfully");
  }
  //-----------------------REMOVE PROFILE PICTURE --------------------------
  const removePicture = () => {
    const removeImage= async () =>{
      const data = new FormData();
        data.append('userId',userId)
      let res = await fetch(
        `http://localhost:8800/user/edit-profile/deleteProfilePicture/${userId}`,
        {
          method: 'PUT',
          body: data,
          headers: {
            'authorization': token
          },
        }
      );
      let responseJson = await res.json();
      console.log("remove picture",responseJson);
    }
    alert("profile picture removed successfully");
  }
  const editProfile = async (e) => {
      e.preventDefault();
      const formData= new FormData();
      formData.append( 'image',picture);
      formData.append( 'gender',gender);
      formData.append( 'dob',dob);
      formData.append( 'userId',userId);
      formData.append( 'bio',bio);
      formData.append( 'username',username);
      formData.append( 'password',password);
      const res = await axios({
        method: 'put',
        url: `http://localhost:8800/user/edit-profile/${userId}`,
        headers:{
            "Content-Type": "multipart/form-data",
            'authorization' : token
        },
        data: formData
    });
     const data = await res.json();
     console.log("data",data);
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
          <TextField variant='outlined' label="Password" sx={{ width: 270 }} id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required></TextField><br /><br />
          <Button variant='contained' onClick={editProfile}>Edit</Button>
        </form>
      </div>
    </div>
  )
}
export default EditProfile;
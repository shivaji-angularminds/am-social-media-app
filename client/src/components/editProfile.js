import React, { useEffect, useState } from 'react'
import { Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio} from '@mui/material'
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";
import Header from './header'
import axios from 'axios';


const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [picture, setPicture] = useState({file:[]});
  const [getUser, setGetUser] = useState();
  const [isSucces, setSuccess] = useState(null);

  const token=JSON.parse(localStorage.getItem('token'));
  //console.log(token);

  const userId=JSON.parse(localStorage.getItem('userId'));
  //console.log(userId)

  const getSpecificUser= async ()=>{
    try{
    const res= await axios.get(`http://localhost:8800/user/${userId}`, {
      headers: {
        'authorization': token
      }
    });
    //console.log( res.data);
    setGetUser(res.data);    
    }
    catch(e) {
        console.log("error", e);
    }
}

useEffect(()=>{
  getSpecificUser();
},[]);




  const addPicture=(event)=>{
    setPicture({
      ...picture,
      file:event.target.files[0].name
    });
   }

  const editPicture = (e) => {
    //setEdit(picture);
    console.log("edited",picture)
  }

  const removePicture = () => {
    setPicture(null);
    console.log("removed",picture)
  }

  const editProfile = async (e) => {
      e.preventDefault();
     const formdata = new FormData(); 
    formdata.append('image', picture.file);                           // upload image in "image" key of database by using formData
    //console.log(formdata);
   // console.log("profile",getUser.firstname)


      const  editData={
            username,
            bio, gender, dob, 
            email, 
            mobile, picture:picture.file
        }
        //console.log("editData",editData);

    const res= await fetch(`http://localhost:8800/user/edit-profile/${userId}`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            'authorization': token
          },  
          body: JSON.stringify({
            username, bio, gender, dob, email, mobile, picture:picture.file
          })
        });

        const data = await res.json();
        console.log("data",data);

        // if(data.user) 
        // {
        //   window.alert(data.message);
        // } 
        // else {
        //   window.alert(data);
        // }
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
          <TextField variant='outlined' label="Email" sx={{ width: 270 }} id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required></TextField><br /><br />
          <TextField variant='outlined' label="Mobile" sx={{ width: 270 }} id="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} required></TextField><br /><br />
          <Button variant='contained' onClick={editProfile}>Edit</Button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile;
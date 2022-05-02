import React, { useState } from 'react'
import { Avatar, Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio} from '@mui/material'
import { height, width } from '@mui/system'
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";
import Header from './header'


const EditProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [picture, setPicture] = useState("");
  const [edit, setEdit] = useState("");

  const addPicture=(e)=>{
   // setPicture(e.target)
   console.log("add",e.target)
  }

  const editPicture = (e) => {
    setEdit(picture);
    console.log("edited",picture)
  }

  const removePicture = () => {
    setPicture(null);
    console.log("removed",picture)
  }

  const editProfile=()=>{
    console.log("name",name)
    console.log("bio",bio)
    console.log("gender",gender)
    console.log("dob",dob)
    console.log("email",email)
    console.log("mobile",mobile)
  }

  return (
    <div className='profile-container'>
      <Header /><br />
      <div className='editform'>
        <form>
          <h1>Edit Profile</h1>
          <div className='profile-picture'>
            <label>Profile picture:</label>
            <Button component="label" onClick={addPicture}> Add<input type="file" hidden /></Button>
            <Button onClick={editPicture}>Edit</Button>
            <Button onClick={removePicture}>Remove</Button>
          </div>
          <TextField variant='outlined' label="Name" sx={{ width: 270 }} id="name" value={name} onChange={(e) => { setName(e.target.value) }} required></TextField><br /><br />
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
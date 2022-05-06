import React, { useState } from 'react'
import { TextField, Button, Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ChangePassword = ({open,handleClose}) => {
 const navigate=useNavigate();
  const [previousPassword, setPreviousPassword]=useState("");
  const [newPassword, setNewPassword]=useState("");
  const [confirmPassword, setConfirmPassword]=useState("");

  const userId=JSON.parse(localStorage.getItem('userId'));
  //console.log(userId)

  const token=JSON.parse(localStorage.getItem('token'));
 // console.log(token);

  const resetPassword=async()=>{
        console.log("userId",userId)
       console.log("previousPassword",previousPassword)
       console.log("newPassword",newPassword)
       console.log("confirmPassword",confirmPassword)

      //  const passwordData={
      //   userId:userId,
      //   previousPassword:previousPassword,
      //   newPassword:newPassword
      //  }

       const res= await fetch(`http://localhost:8800/user/edit-profile/changepassword/${userId}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          'authorization': token
        },
        body: JSON.stringify({
          userId, previousPassword,newPassword
        })
      });

      const data = await res.json();
     console.log(data);
        navigate('/feed');
      
  }

  return (
    <div>
    <Box sx={style}>
      <h1>Change password</h1>
      <TextField label="Current password" value={previousPassword} onChange={(e)=>{setPreviousPassword(e.target.value)}} type="password"></TextField><br/><br/>
      <TextField label="New password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} type="password"></TextField ><br/><br/>
      <TextField label="Confirm password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password"></TextField><br/><br/>
      <Button onClick={resetPassword} variant="contained">Reset</Button>
    </Box>
    </div>
    
  )
}

export default ChangePassword;
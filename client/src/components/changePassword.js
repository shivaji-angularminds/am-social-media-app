import React from 'react'
import { TextField } from '@mui/material';

const ChangePassword = () => {
  return (
    <div>
      <h1>Change password</h1>
      <TextField label="Old password"></TextField>
      <TextField label="New password"></TextField>
      <TextField label="Confirm password"></TextField>
    </div>
  )
}

export default ChangePassword;
import React, {useState} from 'react'
import { Avatar, Button, TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import Header from './header'
import '../App.css'
import axios from 'axios';
import { width } from '@mui/system';

const Feed = () => {
  const [caption,setCaption]=useState([]);
  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

  
  const [isSucces, setSuccess] = useState(null);

  const handleUploadImage=(event)=>{
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    });
    console.log("userinfo",event.target.files[0]);
  }

  const handleCaption=(event)=>{
      setCaption(event.target.value);
  }

  const submit = async () =>{
    const formdata = new FormData(); 
    formdata.append('avatar', userInfo.file);

    axios.post("http://localhost:8800/api/uploadimg", formdata,{   
      headers: { "Content-Type": "multipart/form-data" } 
})
  }
  return (
    <div>
      <Header /><br />
      <div className='feed'>
        <div className='card'>
        {isSucces !== null ? <h4> {isSucces} </h4> :null }
          <div><Button variant="outlined" component="label" className='image'> Upload Image<input type="file" onChange={handleUploadImage} hidden /></Button> </div>&nbsp; &nbsp;
          <div className="captioncard"><TextareaAutosize aria-label="minimum height" className='caption' value={caption} minRows={3} placeholder="Caption" onChange={handleCaption} style={{ width: 360, height: 110 }} />
          <Button variant="contained" sx={{width:365}} onClick={()=>submit()}>Post</Button></div>
        </div>
        <div className='post'>
        <div className='post-card'>
        {userInfo.filepreview !== null ? 
        <img className="previewing"  src={userInfo.filepreview} style={{height:200, width:200}} />
         : null}  
         <p>{caption}</p>        
        </div>
        </div>
      </div>

    </div>
  )
}

export default Feed
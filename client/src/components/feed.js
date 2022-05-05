import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Skeleton,
  TextareaAutosize,
  TextField,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UploadIcon from "@mui/icons-material/Upload";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";

import { useNavigate } from "react-router-dom";
import Header from "./header";
import "../App.css";
import axios from "axios";
import { width } from "@mui/system";
import PostCard from "./PostCard";
import debounce from "lodash.debounce";

const Feed = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const userId = JSON.parse(localStorage.getItem("userId"));
  //console.log(userId)
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(1);
  const [renderFlag, setRenderFlag] = useState(false);
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [imageUrl, setImageUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState();
  const [renderPost, setRenderPost] = useState(false);
  const [postInfo, setPostInfo] = useState({
    caption: "",
    img: "",
  });

  function getAllPosts() {
    fetch(`http://localhost:8800/posts?page=${page}&limit=2`, {
      method: "get",
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (page === 1) {
          console.log("page 1", data.posts.results);
          setPosts(JSON.parse(JSON.stringify(data.posts.results)));
        } else {
          console.log("else    ", [...posts, ...data.posts.results]);
          setPosts(
            JSON.parse(JSON.stringify([...posts, ...data.posts.results]))
          );
        }
      });
  }

  useEffect(() => {
    // console.log("use effect ");
    getAllPosts();
  }, [page]);

  function addPicture(e) {
    const singleFile = e.target.files[0];
    setPostInfo({ ...postInfo, img: singleFile });
    setImageUrl(URL.createObjectURL(singleFile));
  }

  async function handlePostSaveClick() {
    let data = new FormData();
    data.append("image", postInfo.img);
    data.append("userId", userId);

    data.append("caption", postInfo.caption);

    let res = await fetch(`http://localhost:8800/posts/create`, {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: data,
    });
    setRenderFlag(false);

    let responseJson = await res.json();
    console.log(responseJson);
    getAllPosts();
    handleClose();
    setImageUrl("");
  }

  function renderCreatePost() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Button component="label" sx={{color:"black"}} >
            {" "}
            <UploadIcon></UploadIcon>upload image
            <input type="file" onChange={addPicture} hidden />
          </Button>
          <TextField
            size="small"
            value={caption}
            placeholder="enter caption here"
            onChange={(event) => {
              setPostInfo({ ...postInfo, caption: event.target.value });
            }}
          />
        </div>
        <div style={{display:"flex",flexDirection:"column"}} >
        <Box
        component="img"
        sx={{
          boxShadow:9,
          textAlign:"center",
          marginLeft:"60px",
          marginTop:"5px",
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="upload imgage"
        src={imageUrl}
      />
          <Button onClick={handlePostSaveClick} sx={{color:"blue"}} >
            <CloudDoneRoundedIcon></CloudDoneRoundedIcon>Save
          </Button>
        </div>
      </div>
    );
  }

  const handleUploadImage = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleCaption = (event) => {
    setCaption(event.target.value);
  };
  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prev) => prev + 1);
    }
  }, 100);
  const submit = async () => {
    const formdata = new FormData();
    formdata.append("avtar", userInfo.file);

    axios.post("http://localhost:8800/api/uploadimg", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  if (!posts) {
    return <Skeleton variant="rectangular" width={400} height={500} />;
  }

  return (
    <div style={{ backgroundColor: "#EDE4E3" }}>
      <Header />
      <br />
     
      <div>
        <Button  style={{float:"right"}} onClick={handleOpen} sx={{color:"black",}} >
          <AddBoxIcon></AddBoxIcon>Create Post
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>{renderCreatePost()}</Box>
        </Modal>
      </div>
      {renderFlag && renderCreatePost()}
      {console.log("po", posts)}
      <div className="feed1">
        {posts.length != 0 &&
          posts.map((prev) => {
            return <PostCard key={prev._id} post={prev} />;
          })}
      </div>
    </div>
  );
};

export default Feed;

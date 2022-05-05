import React, { useState, useEffect } from "react";
import { Avatar, Button, Skeleton, TextareaAutosize, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import "../App.css";
import axios from "axios";
import { width } from "@mui/system";
import PostCard from "./PostCard";
import debounce from "lodash.debounce";

const Feed = (props) => {
  
  const userId = JSON.parse(localStorage.getItem("userId"));
  //console.log(userId)
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);

  const [page, setPage] = useState(1);
  const [renderFlag, setRenderFlag] = useState(false);
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

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
          console.log( "page 1", data.posts.results);
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
  }

  function renderCreatePost() {
    return (
      <div>
        <Button component="label">
          {" "}
          Add
          <input type="file" onChange={addPicture} hidden />
        </Button>
        <TextField
          value={caption}
          onChange={(event) => {
            setPostInfo({ ...postInfo, caption: event.target.value });
          }}
        />
        <Button onClick={handlePostSaveClick}>Save</Button>
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

  if(!posts){
    
    return <Skeleton variant="rectangular" width={400} height={500} />

    
  }

  return (
    <div style={{backgroundColor:"#EDE4E3"}} >
      <Header />
      <br />
      <Button
        onClick={() => {
          setRenderFlag(true);
        }}
      >
        Create Post
      </Button>
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

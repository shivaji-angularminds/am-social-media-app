import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Button, TextField } from "@mui/material";
// import { post } from '../../../api/routes/post';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard(props1) {
  const user = JSON.parse(localStorage.getItem("userId"));
  //console.log(userId)
  const token = JSON.parse(localStorage.getItem("token"));
  const postId = props1.post._id;
  const [postInfo, setPostInfo] = useState(props1.post);
  const userId = { userId: user };
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(props1.post.likes);
  const [commentflag, setCommentFlag] = useState(false);
  const [commentInfo, setCommentInfo] = useState({
    userId: userId.userId,
    comment: "",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetch(`http://localhost:8800/posts/${postId}`, {
      method: "get",
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPostInfo(data);
      });
  }, [likes,commentflag]);

  let array=postInfo.likes
  const likeButton=array.includes(user);

  // let likeButton
  //  if(postInfo) {
  //   likeButton= array.find(userId) ? true:false;}
  // console.log(likeButton);

  async function handleLikeClick() {
    let res = await fetch(`http://localhost:8800/posts/${postId}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",

        authorization: token,
      },
      body: JSON.stringify(userId),
    });
    let responseJson = await res.json();
    setLikes((prev) => prev + 1);

  }


  function renderComments(){
    if(!postInfo.comments.length == 0){
    return(
      postInfo.comments.map((prev) => {
        return (
          <CardActions>
            <Typography variant="body2" color="text.primary">
              {prev.user}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {prev.comment}
            </Typography>
          </CardActions>
        );
      }))
    } else{
      return(<Typography variant="body2" color="text.secondary">
      no comment to show
      </Typography>)
    }
  
  }

  async function handleCommentClick() {
    let res = await fetch(`http://localhost:8800/posts/${postId}/comment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",

        authorization: token,
      },
      body: JSON.stringify({ ...commentInfo }),
    });
    setCommentFlag((prev) => !prev);
    setCommentInfo({ ...commentInfo, comment: "" });

    let responseJson = await res.json();
  }
  return (
    <Card sx={{ maxWidth: 500, marginLeft: "auto", marginRight: "auto", marginTop:5, boxShadow: 10 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={`http://localhost:8800/${props1.post.userImg}`}
          >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{variant:'h6' }}
        title={postInfo.userName}
        sx={{fontSize:"1rem",fontWeight:700}}
        subheader={postInfo.updatedAt.substring(0, 10)}
      />
      <CardMedia
        component="img"
        height="400"
        image={`http://localhost:8800/${postInfo.img}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" sx={{fontSize:"1rem",fontWeight:400}} color="text.dark">
          {postInfo.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLikeClick} aria-label="add to favorites"   >
          <FavoriteIcon  style={{ color: likeButton ? "red":"black"}} />
          <Typography>{postInfo.likes.length + " "}likes</Typography>
        </IconButton>
        <IconButton aria-label="share">
          <ChatBubbleOutlineIcon
            onClick={() => {
              setCommentFlag((prev) => !prev);
            }}
          />
        </IconButton>
        {commentflag && (
          <div>
            {" "}
            <TextField
            // label="Standard"
             variant="standard"
              value={commentInfo.comment}
              onChange={(event) => {
                setCommentInfo({ ...commentInfo, comment: event.target.value });
              }}
            />
            <Button onClick={handleCommentClick}>post</Button>
          </div>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      { expanded ? renderComments():""}
    </Card>
  );
}

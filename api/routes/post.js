const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/Users");
const validateToken=require("../middleware/verifyToken")
const imageUpload=require("../middleware/uploadimg")
const paginatedResults=require("../middleware/pagination")

// const multer  = require('multer')


// const imageStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: 'images', 
//       filename: (req, file, cb) => {
//           cb(null, file.fieldname + '_' + Date.now() 
//              + (file.originalname))

//             // file.fieldname is name of the field (image)
//             // path.extname get the uploaded file extension
//     }
// });

// const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//       fileSize: 1000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
//          // upload only png and jpg format
//          return cb(new Error('Please upload a Image'))
//        }
//      cb(undefined, true)
//   }
// }) 

// router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
//     res.send(req.file)
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

//create a post



router.post("/create",validateToken,imageUpload.single('image'), async (req, res) => {
  if(req.data.id===req.body.userId){
    const user = await User.findById(req.body.userId)
       let path1=req.file ? req.file.path:""
    const newPost = new Post({
    caption:req.body.caption,
    img:path1,
    userImg:user.profilePicture,
    userId:req.body.userId,
    userName:user.firstname+" "+user.lastname
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      post:savedPost,
      message:"Post created successfully"
      
    });
  } catch (err) {
    res.status(500).json(err);
  }}else{
    res.status(500).json("token expired")
  }
});
//update a post

router.put("/update/:id",validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/delete/:id",validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like",validateToken, async (req, res) => {
  console.log(req.data.id)
  console.log(req.body)
  if(req.data.id===req.body.userId){

  try {
    const post = await Post.findById(req.params.id);
    console.log(post)
    if (! post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      const post1 = await Post.findById(req.params.id);

      res.status(200).json({message:"The post has been liked ",
      likes: post1.likes.length
      })
    } else {

      await post.updateOne({ $pull: { likes: req.body.userId } });
      const post1 = await Post.findById(req.params.id);

      res.status(200).json({message:"The post has been disliked",
      likes:post1.likes.length
    });
    }
  } catch (err) {
    res.status(500).json(err);
  }}else{
    res.status(500).json("token expired login again")
  }
});

//comment on post
router.put("/:id/comment",validateToken, async (req, res) => {
  const user = await User.findById(req.body.userId)

  const post = await Post.findById(req.params.id);
  console.log(req.body)
 
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);

      await post.updateOne({ $push: { comments:{user: user.firstname +" "+user.lastname,comment:req.body.comment,userId:req.body.userId} } });
      res.status(200).json({
        post:post,
      message:"Commented successfully"});
  
  } catch (err) {
    res.status(500).json(err);
  }

});
//get a post

router.get("/:id", validateToken,async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId",validateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts

router.get("/",validateToken,paginatedResults(Post), async (req, res) => {
  const data=res.paginatedResults

  try {
    const posts = await Post.find();
    
    res.status(200).json({
      posts:data,
      message:"fetched all posts successfully"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const posts = await Post.find({ userId: req.params.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all post 
router.get("/", async (req, res) => {
    try {
      const post = await Post.find();
      
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  

module.exports = router;
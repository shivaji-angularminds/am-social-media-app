const User = require("../models/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const validateToken = require("../middleware/verifyToken");
const imageUpload = require("../middleware/uploadimg");

//update user
router.put(
  "/:id",
  validateToken,
  imageUpload.single("image"),
  async (req, res) => {
    if (req.data.id === req.params.id ) {
      if ( req.body.gender && req.body.username) {
        try {
          console.log(req.body);
          const user = await User.findByIdAndUpdate(req.params.id, {
            $set: { ...req.body, profilePicture: req.file.path },
          });
          console.log("bye");
  
          //dfvdfvdfbd
          res.status(200).json({
            user: user,
            message: "info updated successfully",
          });
        } catch (err) {
          console.log(err);
  
          return res.status(500).json(err);
        }
       
      } else {
        //check required things
        let str = {
          flag1: true,
          flag2: true,
          
        };
        if (!req.body.gender) {
          str.flag1 = false;
        }
        if (!req.body.username) {
          str.flag2 = false;
        }
        

        return res.status(403).json({
          message: [
            !str.flag1 && "please provide gender",
            !str.flag2 && "please provide username",
            
          ],
        });
      }
     
    } else {
      return res.status(403).json("You can update only your account!");
    }
  }
);

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/:id", validateToken, async (req, res) => {
  if(req.data.id===req.params.id){
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }}
  else{
    res.status(500).json("you can access your profile only");
  }
});

// delete profile picture
router.put("/deleteProfilePicture/:id", validateToken, async (req, res) => {
  if (req.data.id === req.params.id ) {
    

      try {
        
        const user = await User.findByIdAndUpdate(req.params.id,{
          $set: {  profilePicture:"" },
        })

        res.status(200).json({
          message:"profile picture deleted successfully"
        })
  
     
      } catch (err) {
        return res.status(500).json({ success: false, message: err });
      }
    
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//get all users
router.get("/", validateToken, async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//edit profile profilePicture
router.put("/editProfilePicture/:id", validateToken,imageUpload.single('image'), async (req, res) => {
  if (req.data.id === req.params.id ) {
    

      try {
        
        const user = await User.findByIdAndUpdate(req.params.id,{
          $set: {  profilePicture:req.file.path },
        })

        res.status(200).json({
          message:"profile picture edited successfully"
        })
  
     
      } catch (err) {
        return res.status(500).json({ success: false, message: err });
      }
    
  } else {
    return res.status(403).json("You can update only your account!");
  }
});


//change password
router.put("/changepassword/:id", validateToken, async (req, res) => {
  if (req.data.id === req.params.id || req.body.isAdmin) {
    if (req.body.previousPassword && req.body.newPassword) {
      const user = await User.findByIdAndUpdate(req.params.id);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.previousPassword, salt);

      try {
        bcrypt.compare(
          req.body.previousPassword,
          user.password,
          async function (err, res1) {
            console.log("hello");
            if (res1) {
              let newHashed = await bcrypt.hash(req.body.newPassword, salt);
              console.log(res1);
              await user.updateOne({ $set: { password: newHashed } });
              res.status(200).json({
                user: user,
                message: "info updated successfully",
              });
            } else {
              // response is OutgoingMessage object that server response http request
              return res.json({
                success: false,
                message: "please provide correct password",
              });
            }
          }
        );
      } catch (err) {
        return res.status(500).json({ success: false, message: err });
      }
    } else {
      //check required things
      let str = {
        flag1: true,
        flag2: true,
      };
      if (!req.body.previousPassword) {
        str.flag1 = false;
      }
      if (!req.body.newPassword) {
        str.flag2 = false;
      }

      return res.status(403).json({
        message: [
          !str.flag1 && "please provide previousPassword",
          !str.flag2 && "please provide newPassword",
          !str.flag3,
        ],
      });
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;

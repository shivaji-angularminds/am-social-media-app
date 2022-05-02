const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const {userValidation}=require("./validation")
const token=require("jsonwebtoken")
const validateToken=require("../middleware/verifyToken")

console.log(User);

const generateToken=(user)=>{
 return token.sign({id:user.id,email:user.email,lastname:user.lastname},process.env.SECRET_KEY,{
   expiresIn:"86400s"
 })
}


//REGISTER
router.post("/sign-up", async (req, res) => {
  console.log("hello")
  try {
    // generate new password
    let {error}=userValidation(req.body)
console.log(error)
    if(error){
      console.log(error)
   return  res.status(500).json(error);
    }else{

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    console.log(req.body);
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      
    });
    console.log(newUser);
    //save user and respond
    const user = await newUser.save();
    return res.status(200).json({
      user:user,  
        message:"sign up successfully"
    });
  }
  
  } catch (err) {
    console.log(err);
  return   res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(validPassword);
    !validPassword && res.status(400).json("wrong password");
const tok=generateToken(user)
    res.status(200).json({
      user:user,   
      token:tok,
       message:"login successfully"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get specific user info

router.get("/:id", validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
   
    firstname:{
     type:String,
     require:true
    },
    lastname:{
        type:String,
        require:true
       },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
     
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
   
   
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      max: 50,
    },
    dob: {
      type: String,
      
    },
    gender:{
        type:String
    },
    mobile: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UsersData", UserSchema);
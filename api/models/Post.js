const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments:{
        type:Array,
        defalut:[]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
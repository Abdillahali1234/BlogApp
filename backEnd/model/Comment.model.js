const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    userName:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);


const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
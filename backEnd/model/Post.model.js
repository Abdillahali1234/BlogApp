const { object } = require("joi");
const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      min: 3,
      max: 200,
    },
    description: {
      required: true,
      type: String,
      min: 10,
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

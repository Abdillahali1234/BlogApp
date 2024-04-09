const {
  validateSchemaToPost,
  schemaToUpdatePost,
} = require("../schema/postSchema");
const expressHandler = require("express-async-handler");
const Post = require("../model/Post.model");
const { Comment } = require("../model/Comment.model");
const path = require("path");
const fs = require("fs");
const {
  uploadCloudinary,
  removeCloudinary,
} = require("../utilities/Cloudainry");

/**------------------------------------------------------------------------------
 * @desc  create a new post
 * 
 * @router /api/posts
 * 
 *@method POST 
 * 
 * @access private  (logged in user only and admin) 
 ----------------------------------------------------------------------------------*/

const createPostCtrl = expressHandler(async (req, res) => {
  // validation for image upload

  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  // validate the schema
  const { errors } = validateSchemaToPost(req.body);
  if (errors) {
    return res.status(400).json({ message: errors.details[0].message });
  }
  // path to photo
  const pathPhoto = path.join(__dirname, `../images/${req.file.filename}`);
  // upload photo
  const result = await uploadCloudinary(pathPhoto);

  // create the post
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });
  res.status(201).json({ message: "success", post: post });

  fs.unlinkSync(pathPhoto);
});

/**------------------------------------------------------------------------------
 * @desc  get all posts
 *
 * @router /api/posts
 *
 *@method GET
 *
 * @access public  ----------------------------------------------------------------------------------*/

const getAllPostsCtrl = async (req, res) => {
  const POST_PER_PAGE = 3;
  const { pageNumber, category } = req.query;
  let posts;

  if (pageNumber) {
    posts = await Post.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }

  res.status(200).json({ message: "success", posts: posts });
};
/**------------------------------------------------------------------------------
 * @desc  get single post
 *
 * @router /api/posts/:id
 *
 *@method GET
 *
 * @access public
 *
 *  ----------------------------------------------------------------------------------*/

const getPostCtrl = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", {
      "-password": false,
    })
    .populate("comments");

  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  res.status(200).json({ message: "success", post: post });
};
/**------------------------------------------------------------------------------
 * @desc  get count post
 *
 * @router /api/posts/count
 *
 *@method GET
 *
 * @access public
 *
 *  ---------------------------------------------------------------------------*/
const getCountPostsCtrl = async (req, res) => {
  const count = await Post.countDocuments();
  res.status(200).json({ message: "success", count: count });
};
/**------------------------------------------------------------------------------
 * @desc  get count post
 *
 * @router /api/posts/:id
 *
 *@method DELETE
 *
 * @access private (only admin and user have post)
 *
 *  ---------------------------------------------------------------------------*/

const deletePostCtrl = async (req, res) => {
  // find post by id
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "error", post: "not found post" });
  }

  if (req.user.isAdmin || req.user.id == post.user) {
    // remove image post from  cloudinary
    await removeCloudinary(post.image.publicId);
    // remove all comments to post
    await Comment.deleteMany({ postId: req.params.id });
    const result = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "success", post: result });
  } else {
    res.status(403).json({
      message: "error",
      post: "not allowed to delete only user make post or admin",
    });
  }
};

/**------------------------------------------------------------------------------
 * @desc  update post to current user
 *
 * @router /api/posts/:id
 *
 * @method PATCH
 *
 * @access private (only user owner to post)
 *
 *  ---------------------------------------------------------------------------*/

const updatePostCtrl = expressHandler(async (req, res) => {
  const { error } = schemaToUpdatePost(req.body);
  // validate on data
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // get the post from database

  const post = await Post.findById(req.params.id);
  // validate on post if exist or no
  if (!post) {
    return res.status(404).json({ message: "not found post" });
  }

  // check if user is owner to post you need update

  if (!req.user.id === post.user.toString()) {
    return res
      .status(403)
      .json({ message: "Fail", post: "not allowed (only owner to post)" });
  }

  // update the post
  const result = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", { "-password": false });

  res.status(200).json({ message: "success", post: result });
});

/**------------------------------------------------------------------------------
 * @desc  update photo to post to owner  user post
 *
 * @router /api/posts/post-image/:id
 *
 * @method PATCH
 *
 * @access private (only user owner to post)
 *
 *  ---------------------------------------------------------------------------*/

const updatePostPhotoCtrl = expressHandler(async (req, res) => {
  const { error } = schemaToUpdatePost(req.body);
  // validate on image upload or no
  if (!req.file) {
    return res.status(400).json({ message: "no provided file" });
  }

  // get the post from database
  const post = await Post.findById(req.params.id);
  // validate on post if exist or no
  if (!post) {
    return res.status(404).json({ message: "not found post" });
  }

  // check if user is owner to post you need update

  if (!req.user.id === post.user.toString()) {
    return res
      .status(403)
      .json({ message: "Fail", post: "not allowed (only owner to post)" });
  }
  // upload photo on cloudinary server:
  //1-delete old photo on cloudinary server

  await removeCloudinary(post.image.publicId);

  // path to photo

  const pathPhoto = path.join(__dirname, `../images/${req.file.filename}`);
  // upload new  photo on cloudinary server
  const result = await uploadCloudinary(pathPhoto);
  // update the image in data base
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Post image updated successfully", post: updatedPost });

  fs.unlinkSync(pathPhoto);
});

/**------------------------------------------------------------------------------
 * @desc  toggle like pn post
 *
 * @router /api/posts/like:id
 *
 * @method PATCH
 *
 * @access private (only logged in  user to post)
 *
 *  ---------------------------------------------------------------------------*/

const toggleLikeCtrl = expressHandler(async (req, res) => {
  const { id: postId } = req.params;
  let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // check if user already make like on the post
  const userLikedExist = post.likes.find(
    (userId) => userId.toString() === req.user.id
  );
  if (userLikedExist) {
    post = await Post.findByIdAndUpdate(postId, 
      {
      $pull: {
        likes: req.user.id,
      },
    },{new:true});
  } else {
    post = await Post.findByIdAndUpdate(postId, {
      $push: {
        likes: req.user.id,
      },
    },{new:true});
  }
  res.status(200).json({ message: "success", post: post });
});
module.exports = {
  createPostCtrl,
  getAllPostsCtrl,
  getPostCtrl,
  getCountPostsCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostPhotoCtrl,
  toggleLikeCtrl,
};

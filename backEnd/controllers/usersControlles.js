const { User } = require("../model/User.model");
const { Comment } = require("../model/Comment.model");
const Post = require("../model/Post.model");
const bcrypt = require("bcryptjs");
const { schemaValidateToUpdate } = require("../schema/authSchema");
const expressHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const {
  uploadCloudinary,
  removeCloudinary,
  removeCloudinaryImages,
} = require("../utilities/Cloudainry");
/**------------------------------------------------------------------------------
 * @desc get all users
 * 
 * @router /api/users/profile
 * 
 *@method GET 
 * 
 * @access private 
 ----------------------------------------------------------------------------------*/
const getAllUsers = async (req, res) => {
  const users = await User.find().populate("posts", { id: false });

  res.status(200).json({ message: "success", users: users });
};

/**------------------------------------------------------------------------------
 * @desc get user 
 * 
 * @router /api/users/profile/:id
 * 
 *@method GET 
 * 
 * @access public 
 ----------------------------------------------------------------------------------*/
const getUser = async (req, res) => {
  const Id = req.params.id;

  const user = await User.findById(Id).select("-password").populate("posts");

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json({ message: "success", user });
};
/**------------------------------------------------------------------------------
 * @desc update user
 * 
 * @router /api/users/profile/:id
 * 
 *@method PATCH 
 * 
 * @access private (only user)
 ----------------------------------------------------------------------------------*/
const updateUser = async (req, res) => {
  const Id = req.params.id;

  const { error } = schemaValidateToUpdate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { fName, lName, password, bio } = req.body;
  const user = await User.findByIdAndUpdate(
    Id,
    {
      fName,
      lName,
      bio,
    },
    { new: true }
  ).select("-password").populate("posts");

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(
      Id,
      {
        password: hashedPassword,
      },
      { new: true }
    ).select("-password");
  }

  if (user) {
    res.status(200).json({ message: "success", data: user });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

/**------------------------------------------------------------------------------
 * @desc get count of users
 * 
 * @router /api/users/count
 * 
 *@method GET 
 * 
 * @access private (only admin)
 ----------------------------------------------------------------------------------*/

const getCountOfUsers = async (req, res) => {
  const count = await User.countDocuments();

  res.status(200).json({ message: "success", count: count });
};

/**------------------------------------------------------------------------------
 * @desc upload photo to profile
 * 
 * @router /api/users/profile/profile-upload-photo
 * 
 *@method POST
 * 
 * @access private (only logged in user)
 ----------------------------------------------------------------------------------*/

const uploadPhotoCtrl = expressHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no file selected" });
  }

  const pathPhoto = path.join(__dirname, `../images/${req.file.filename}`);
  // upload photo
  const image = await uploadCloudinary(pathPhoto);

  if (!image) {
    return res.status(400).json({ message: "photo upload failed" });
  }
  // get user from db
  const user = await User.findByIdAndUpdate(req.user.id);
  if (user.imagePortfolio.publicId) {
    const result = removeCloudinary(user.imagePortfolio.publicId);
  }
  // change url photo in db
  await User.findByIdAndUpdate(req.user.id, {
    $set: {
      imagePortfolio: {
        url: image.secure_url,
        publicId: image.public_id,
      },
    },
  });

  res.status(200).json({
    message: "photo uploaded success",
    data: { url: image.secure_url, publicId: image.public_id },
  });

  // delete the image from image folder
  fs.unlinkSync(pathPhoto);
});

const deleteUserProfile = async (req, res) => {
  // get user profile
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  // get all posts to user

  const posts = await Post.find({ user: user._id });
  const publicIds = posts?.map((post) => post.image.publicId);

  if (publicIds?.length > 0) {
    await removeCloudinaryImages(publicIds);
  }
  // delete user image from Cloudinary
  if (user.imagePortfolio.publicId !== null) {
    await removeCloudinary(user.imagePortfolio.publicId);
  }
  // delete all posts to user and comments
  await Post.deleteMany({ user: user.id });
  await Comment.deleteMany({ userId: user.id });
  // delete user profile from database
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "user deleted" });
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  getCountOfUsers,
  deleteUserProfile,
  uploadPhotoCtrl,
};

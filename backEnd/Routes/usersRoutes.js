const router = require("express").Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  getCountOfUsers,
  uploadPhotoCtrl,
  deleteUserProfile,
} = require("../controllers/usersControlles");
const { uploadPhoto } = require("../middlewares/upladImage.js");

const confirmObjectId = require("../middlewares/verfiyObjectId.js");

const {
  verifyIsAdmin,
  verifyIsUserToUpdateData,
  verifyToken,
  verifyIsUserAndAdminToDelete,
} = require("../middlewares/verifyToken.js");

// get all users
router.route("/profile").get(verifyIsAdmin, getAllUsers);

// upload photo profile to logged in user

router
  .route("/profile/profile-upload-photo")
  .post(verifyToken, uploadPhoto.single("image"), uploadPhotoCtrl);

// get and update user
router
  .route("/profile/:id")
  .get(confirmObjectId, getUser)
  .patch(confirmObjectId, verifyIsUserToUpdateData, updateUser);

// get count of users
router.route("/count").get(verifyIsAdmin, getCountOfUsers);
router
  .route("/profile/:id")
  .delete(verifyIsUserAndAdminToDelete, deleteUserProfile);
module.exports = router;

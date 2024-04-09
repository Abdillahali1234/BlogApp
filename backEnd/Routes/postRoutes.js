const {
  createPostCtrl,
  getAllPostsCtrl,
  getPostCtrl,
  getCountPostsCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostPhotoCtrl,
  toggleLikeCtrl,
} = require("../controllers/postControlle");
const { uploadPhoto } = require("../middlewares/upladImage");
const confirmObjectId = require("../middlewares/verfiyObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router
  .route("/")
  .post(verifyToken, uploadPhoto.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

router.route("/count").get(getCountPostsCtrl);

router
  .route("/:id")
  .get(confirmObjectId, getPostCtrl)
  .delete(confirmObjectId, verifyToken, deletePostCtrl)
  .patch(confirmObjectId, verifyToken, updatePostCtrl);

router
  .route("/post-image/:id")
  .patch(
    confirmObjectId,
    verifyToken,
    uploadPhoto.single("image"),
    updatePostPhotoCtrl
  );

router.route("/likes/:id").patch(confirmObjectId, verifyToken, toggleLikeCtrl);
module.exports = router;

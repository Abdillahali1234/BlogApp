const {
  CreateCommentCtrl,
  getAllCommentsCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} = require("../controllers/commentControle");
const confirmObjectId = require("../middlewares/verfiyObjectId");
const { verifyToken, verifyIsAdmin } = require("../middlewares/verifyToken");

const router=require("express").Router();


router
  .route("/")
  .post(verifyToken, CreateCommentCtrl)
  .get(verifyIsAdmin, getAllCommentsCtrl);



router.route("/:id")
.delete(confirmObjectId,verifyToken,deleteCommentCtrl)
.patch(confirmObjectId,verifyToken,updateCommentCtrl)

module.exports = router
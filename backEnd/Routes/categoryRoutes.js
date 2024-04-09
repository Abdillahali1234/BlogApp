const { createCategoryCtrl, deleteCategoryCtrl, getAllCategoryCtrl } = require("../controllers/categotyControle");
const confirmObjectId = require("../middlewares/verfiyObjectId");
const { verifyIsAdmin } = require("../middlewares/verifyToken");

const router=require("express").Router();



router.route("/")
.post(verifyIsAdmin, createCategoryCtrl)
.get(getAllCategoryCtrl)

router.route("/:id").delete(confirmObjectId,verifyIsAdmin,deleteCategoryCtrl);
module.exports = router;

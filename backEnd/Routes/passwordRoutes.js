const {
  sendResetPasswordCtrl,
  resetPasswordCtrl,
  getResetPasswordCtrl,
} = require("../controllers/passwordControler");

const router = require("express").Router();

router.route("/reset-password-link").post(sendResetPasswordCtrl);

router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordCtrl)
  .post(resetPasswordCtrl);

module.exports = router;

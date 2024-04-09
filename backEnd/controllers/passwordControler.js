const bcrypt = require("bcryptjs");
const joi = require("joi");
const expressAsyncHandler = require("express-async-handler");
const { User } = require("../model/User.model");
const { validateEmail, validatePassword } = require("../schema/authSchema");
const { VerificationToken } = require("../model/Verification.model");
const crypto = require("crypto");
const SendEmail = require("../utilities/SendEmail");
/**----------------------------------------------------------------
 * 
 * @desc send reset password link
 * 
 * @Router  /api/password/reset-password-link
 * 
 * @method POST
 * 
 * @access public
 ----------------------------------------------------------------*/

module.exports.sendResetPasswordCtrl = expressAsyncHandler(async (req,res) => {
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email" });
  }
  //creating verification
  let verification = await VerificationToken.findOne({ userId: user._id });
  if (!verification) {
    const token = crypto.randomBytes(20).toString("hex");
    verification = new VerificationToken({
      userId: user._id,
      token: token,
    });

    await verification.save();
  }

  // creating link to send user
  const link = `${process.env.LINK_CLIENT}/reset-password/${user._id}/${verification.token}`;
  // creating html template
  const htmlTemplate = `<h1>Reset Password Link</h1>
  <a href="${link}">Reset Password</a>`;
  await SendEmail(user.email, "reset password", htmlTemplate);

  res.status(200).json({
    message: `Password reset link sent to  ${user.email} (please check your email)`,
  });
});

/**----------------------------------------------------------------
 * 
 * @desc send reset password link
 * 
 * @Router  /api/password/reset-password/:userId/:token
 * 
 * @method GET
 * 
 * @access public
 ----------------------------------------------------------------*/

module.exports.getResetPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ message: "invalid link" });
  }

  const verification = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verification) {
    return res.status(400).json({ message: "invalid link" });
  }

  res.status(200).json({
    message: `Valid Url`,
  });
});

/**----------------------------------------------------------------
 * 
 * @desc  reset password 
 * 
 * @Router  /api/password/reset-password/:userId/:token
 * 
 * @method POSt
 * 
 * @access public
 ----------------------------------------------------------------*/

module.exports.resetPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { error } = validatePassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "invalid Link" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "invalid Link" });
  }

  if (!user.isCountVerified) {
    user.isCountVerified = true;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;

  await user.save();
  await VerificationToken.deleteOne(verificationToken);

  res.status(200).json({
    message: `Password reset successfully`,
  });
});

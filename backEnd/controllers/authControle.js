const bcrypt = require("bcryptjs");
const joi = require("joi");
const expressAsyncHandler = require("express-async-handler");
const { User } = require("../model/User.model");
const {
  schemaValidateToRegister,
  schemaValidateToLogin,
} = require("../schema/authSchema");
const { generateJwt } = require("../utilities/genrateJwt");
const { VerificationToken } = require("../model/Verification.model");
const crypto = require("crypto");
const SendEmail = require("../utilities/SendEmail");
/**----------------------------------------------------------------
 * 
 * @desc Register user controller
 * 
 * @Router  /api/auth/register
 * 
 * @method POST
 * 
 * @access public
 ----------------------------------------------------------------*/

// @TODO: sending email to verify email
module.exports.registerUserCtrl = expressAsyncHandler(async (req, res) => {
  const { error } = schemaValidateToRegister(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  // bcrypt password
  const { fName, lName, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    fName,
    lName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // new verification

  const verificationToken = new VerificationToken({
    userId: newUser._id,
    token: crypto.randomBytes(32).toString("hex"),
  });

  await verificationToken.save();
  // making link
  const link = `${process.env.LINK_CLIENT}/users/${newUser._id}/verify/${verificationToken.token}`;
  // make html template
  const html = `<h1>Hello ${newUser.email.split("@")[0]}</h1>
  <p>Please click on the below link to verify your email</p>
  <a href="${link}">Click Here</a>
  <p>If you did not make this request, please ignore this email</p>
  `;
  //sending email
  await SendEmail(newUser.email, `Hello ${newUser.email.split("@")[0]}`, html);
  res.status(201).json({
    message: "we sent to you an email. Please verify your email address",
  });
});

/**----------------------------------------------------------------
 * 
 * @desc Login user controller
 * 
 * @Router  /api/auth/login
 * 
 * @method POST
 * 
 * @access public
 ----------------------------------------------------------------*/

// @TODO: sending email to verify email
module.exports.loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // validate user
  const { error } = schemaValidateToLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "email not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "password not correct" });
  }

  if (!user.isCountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });
    console.log(verificationToken);
    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }

    const link = `${process.env.LINK_CLIENT}/users/${user._id}/verify/${verificationToken.token}`;
    // make html template
    const html = `<h1>Hello ${user.email.split("@")[0]}</h1>
  <p>Please click on the below link to verify your email</p>
  <a href="${link}">Click Here</a>
  <p>If you did not make this request, please ignore this email</p>
  `;
    //sending email
    await SendEmail(user.email, `Hello ${user.email.split("@")[0]}`, html);

    return res.status(400).json({
      message: "we sent to you an email. Please verify your email address",
    });
  }

  const token = await generateJwt({
    email: email,
    id: user._id,
    isAdmin: user.isAdmin,
  });

  res.status(200).json({
    message: "User logged in successfully",
    token: token,
    id: user._id,
    username: user.email.split("@")[0],
    isAdmin: user.isAdmin,
    profilePhoto: user.imagePortfolio,
    fullName: user.fName + " " + user.lName,
  });
});

/**----------------------------------------------------------------
 * 
 * @desc verify email to user
 * 
 * @Router  /api/auth/:userId/verify/:token
 * 
 * @method POST
 * 
 * @access public
 ----------------------------------------------------------------*/

module.exports.verifyTokenCtrl = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "invalid link" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "invalid link" });
  }

  user.isCountVerified = true;

  await user.save();
  await VerificationToken.deleteOne(verificationToken);

  res.status(200).json({ message: "Your account verified" });
});

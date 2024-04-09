const router=require('express').Router();
const { registerUserCtrl, loginUserCtrl, verifyTokenCtrl } = require('../controllers/authControle');


router.post("/register", registerUserCtrl);

router.post("/login", loginUserCtrl);

router.get("/:userId/verify/:token", verifyTokenCtrl);

module.exports= router
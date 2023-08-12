// ========ROUTES======== //
const express = require("express");
const router = express.Router();

const {
  checkRegistrUserData,
  checkLoginUserData,
  protect,
  uploadUserAvatar,
} = require("../middlewares/usersMiddlewares");
const {
  registrUser,
  loginUser,
  currentUser,
  logoutUser,
  changeUserAvatar,
  verifyEmail,
  repeatedVerifyEmail,
} = require("../controllers/usersControllers");

// REGISTRATION ROUTE
router.post("/register", checkRegistrUserData, registrUser);

// LOGIN ROUTE
router.post("/login", checkLoginUserData, loginUser);

// LOGOUT ROUTE
router.post("/logout", protect, logoutUser);

// GET CURRET USER ROUTE
router.get("/current", protect, currentUser);

// CHANGE AVATAR FOR CUSTOM IMAGE
router.patch("/avatars", protect, uploadUserAvatar, changeUserAvatar);

// VERIFICATION EMAIL BY LINK WITH VERIFICATION TOKEN
router.get("/verify/:verificationToken", verifyEmail);

// REPEATE SEND OF VERIFICATION TOKEN
router.post("/verify", repeatedVerifyEmail);

module.exports = router;

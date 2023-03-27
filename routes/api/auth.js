const express = require("express");
const router = express.Router();
const { validateBody, authentificate } = require("../../middlewares");
const { userModel } = require("../../models");
const { loginControllers } = require("../../controllers");
const { register, login, logout } = loginControllers;
const { verifyEmail, resendVerification } = require("../../services/email");

const { signupSchema, signinSchema, emailSchema } = userModel;

router.post("/register", validateBody(signupSchema), register);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validateBody(emailSchema), resendVerification);
router.post("/login", validateBody(signinSchema), login);
router.post("/logout", authentificate, logout);

module.exports = router;

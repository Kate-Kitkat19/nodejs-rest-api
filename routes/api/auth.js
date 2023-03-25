const express = require("express");
const router = express.Router();
const { validateBody, authentificate } = require("../../middlewares");
const { userModel } = require("../../models");
const { loginControllers } = require("../../controllers");
const { register, login, logout } = loginControllers;

const { signupSchema, signinSchema } = userModel;

router.post("/register", validateBody(signupSchema), register);
router.post("/login", validateBody(signinSchema), login);

router.post("/logout", authentificate, logout);

module.exports = router;

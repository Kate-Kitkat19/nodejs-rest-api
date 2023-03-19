const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const { userModel } = require("../../models");
const { userControllers } = require("../../controllers");
const { authentificate } = require("../../middlewares");
const { register, login, getCurrent, logout } = userControllers;
const { signupSchema, signinSchema } = userModel;

router.post("/register", validateBody(signupSchema), register);
router.post("/login", validateBody(signinSchema), login);
router.get("/current", authentificate, getCurrent);
router.post("/logout", authentificate, logout);

module.exports = router;

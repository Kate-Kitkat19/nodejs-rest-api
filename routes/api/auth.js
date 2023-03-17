const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const { userModel } = require("../../models");
const { userControllers } = require("../../controllers");

const { register, login } = userControllers;
const { signupSchema, signinSchema } = userModel;

router.post("/register", validateBody(signupSchema), register);
router.post("/login", validateBody(signinSchema), login);

module.exports = router;

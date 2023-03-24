const express = require("express");
const { upload, authentificate } = require("../../middlewares");
const { usersControllers } = require("../../controllers");
const router = express.Router();
const { getCurrent, updateAvatar } = usersControllers;

router.patch("/avatars", authentificate, upload.single("avatar"), updateAvatar);
router.get("/current", authentificate, getCurrent);
module.exports = router;

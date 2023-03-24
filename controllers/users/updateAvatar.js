const { errorCatcher } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");
const { userModel } = require("../../models");
const jimp = require("jimp");

const { User } = userModel;

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log("avatarsDir:", avatarsDir);

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  console.log("updateAvatar   resultUpload:", resultUpload);
  const img = await jimp.read(tempUpload);
  await img.resize(250, jimp.AUTO).writeAsync(tempUpload);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  updateAvatar: errorCatcher(updateAvatar),
};

const { userModel } = require("../../models");
const { HttpError } = require("../../helpers");
const { errorCatcher } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = userModel;
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Invalid email or password");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Invalid password");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

  res.json({
    token,
  });
};

module.exports = {
  login: errorCatcher(login),
};

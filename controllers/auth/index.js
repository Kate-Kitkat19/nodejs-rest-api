const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { verifyEmail } = require("./verifyEmail");
const { resendVerification } = require("./resendVerification");

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  resendVerification,
};

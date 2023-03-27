const { HttpError, errorCatcher, sendEmail } = require("../../helpers");
const { userModel } = require("../../models");
const emailBody = require("./emailBody");
const { User } = userModel;

const resendVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail(emailBody(email, user.verificationToken));

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = {
  resendVerification: errorCatcher(resendVerification),
};

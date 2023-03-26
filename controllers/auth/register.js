const { userModel } = require("../../models");
const { HttpError, errorCatcher, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = userModel;
const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const registeredEmail = await User.findOne({ email });
  if (registeredEmail) {
    throw new HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  if (newUser) {
    res.status(201).json({
      status: 201,
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } else {
    throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
  }
};

module.exports = {
  register: errorCatcher(register),
};

const { userModel } = require("../../models");
const { HttpError } = require("../../helpers");
const { errorCatcher } = require("../../helpers");
const bcrypt = require("bcrypt");

const { User } = userModel;
const register = async (req, res, next) => {
  const { email, password } = req.body;
  const registeredEmail = await User.findOne({ email });
  if (registeredEmail) {
    throw new HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  if (newUser) {
    res
      .status(201)
      .json({
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

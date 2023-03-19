const { contactModel } = require("../../models");
const { errorCatcher } = require("../../helpers");

const addContact = async (req, res) => {
  const owner = req.user._id;
  const newContact = await contactModel.Contact.create({ ...req.body, owner });
  res.status(201).json({ status: 201, data: newContact });
};

module.exports = {
  addContact: errorCatcher(addContact),
};

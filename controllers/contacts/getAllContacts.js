const { contactModel } = require("../../models");
const { errorCatcher } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactModel.Contact.find({ owner });
  res.json(result);
};

module.exports = {
  getAllContacts: errorCatcher(getAllContacts),
};

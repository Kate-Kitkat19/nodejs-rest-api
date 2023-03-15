const contactModel = require("../../models");
const { errorCatcher } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const result = await contactModel.Contact.find({});
  res.json(result);
};

module.exports = {
  getAllContacts: errorCatcher(getAllContacts),
};

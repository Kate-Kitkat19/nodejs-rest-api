const contactModel = require("../../models");
const { HttpError } = require("../../helpers");
const { errorCatcher } = require("../../helpers");

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const data = await contactModel.Contact.findById(id);
  if (data) {
    res.status(200).json(data);
  } else {
    throw HttpError(404, "Not found");
  }
};

module.exports = {
  getContactById: errorCatcher(getContactById),
};

const contactModel = require("../../models");
const { HttpError } = require("../../helpers");
const { errorCatcher } = require("../../helpers");

const deleteContact = async (req, res) => {
  const id = req.params.contactId;
  const deletedContact = await contactModel.Contact.findByIdAndRemove({ _id: id });
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  deleteContact: errorCatcher(deleteContact),
};

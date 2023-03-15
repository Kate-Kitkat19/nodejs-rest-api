const contactModel = require("../../models");
const { HttpError } = require("../../helpers");
const { errorCatcher } = require("../../helpers");

const updateContact = async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await contactModel.Contact.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ status: 200, data: updatedContact });
};

module.exports = {
  updateContact: errorCatcher(updateContact),
};

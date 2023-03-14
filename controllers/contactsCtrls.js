const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError");
const errorCatcher = require("../helpers/ErrorCatcher");

const getContacts = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const data = await Contact.findById(id);
  if (data) {
    res.status(200).json(data);
  } else {
    throw HttpError(404, "Not found");
  }
};

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ status: 201, data: newContact });
};

const deleteContact = async (req, res) => {
  const id = req.params.contactId;
  const deletedContact = await Contact.findByIdAndRemove({ _id: id });
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ status: 200, data: updatedContact });
};

const updateFavorite = async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ status: 200, data: updatedContact });
};

module.exports = {
  getContacts: errorCatcher(getContacts),
  getContactById: errorCatcher(getContactById),
  addContact: errorCatcher(addContact),
  deleteContact: errorCatcher(deleteContact),
  updateContact: errorCatcher(updateContact),
  updateFavorite: errorCatcher(updateFavorite),
};

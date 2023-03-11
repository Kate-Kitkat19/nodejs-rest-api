const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const getContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    if (result) {
      res.status(200).json(result);
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await contacts.getContactById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await contacts.addContact(req.body);
    res.status(201).json({ status: 201, data: newContact });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await contacts.removeContact(id);
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw HttpError(400, "Missing fields!");
  }
  try {
    const id = req.params.contactId;
    const updatedContact = await contacts.updateContactById(id, req.body);
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ status: 200, data: updatedContact });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
};

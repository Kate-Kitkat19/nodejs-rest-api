const express = require("express");
const {contactModel} = require("../../models");
const {
  validateContactId,
  validateBody,
  authentificate,
} = require("../../middlewares");
const { contactControllers } = require("../../controllers");
const router = express.Router();

const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = contactControllers;

router.get("/", authentificate, getAllContacts);

router.get("/:contactId", authentificate, validateContactId, getContactById);

router.post(
  "/",
  authentificate,
  validateBody(contactModel.contactsSchema),
  addContact
);

router.delete("/:contactId", authentificate, validateContactId, deleteContact);

router.put(
  "/:contactId",
  authentificate,
  validateContactId,
  validateBody(contactModel.contactsSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authentificate,
  validateContactId,
  validateBody(contactModel.updateFavSchema),
  updateFavorite
);

module.exports = router;

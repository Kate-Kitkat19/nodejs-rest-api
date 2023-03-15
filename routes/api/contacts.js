const express = require("express");
const contactModel = require("../../models");
const { validateContactId, validateBody } = require("../../middlewares");
const contactControllers = require("../../controllers");
const router = express.Router();

const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = contactControllers;

router.get("/", getAllContacts);

router.get("/:contactId", validateContactId, getContactById);

router.post("/", validateBody(contactModel.contactsSchema), addContact);

router.delete("/:contactId", validateContactId, deleteContact);

router.put(
  "/:contactId",
  validateContactId,
  validateBody(contactModel.contactsSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  validateContactId,
  validateBody(contactModel.updateFavSchema),
  updateFavorite
);

module.exports = router;

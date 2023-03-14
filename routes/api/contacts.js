const express = require("express");
const { contactsSchema, updateFavSchema } = require("../../models/contact");
const validateBody = require("../../middlewares/validation");
const checkId = require("../../middlewares/validateContactId");
const ctrls = require("../../controllers/contactsCtrls");
const router = express.Router();

router.get("/", ctrls.getContacts);

router.get("/:contactId", checkId, ctrls.getContactById);

router.post("/", validateBody(contactsSchema), ctrls.addContact);

router.delete("/:contactId", checkId, ctrls.deleteContact);

router.put(
  "/:contactId",
  checkId,
  validateBody(contactsSchema),
  ctrls.updateContact
);

router.patch(
  "/:contactId/favorite",
  checkId,
  validateBody(updateFavSchema),
  ctrls.updateFavorite
);

module.exports = router;

const express = require("express");
const contactsSchema = require("../../schemas/contactsValidate");
const validateBody = require("../../middlewares/validation");
const ctrls = require("../../controllers/contactsCtrls");
const router = express.Router();

router.get("/", ctrls.getContacts);

router.get("/:contactId", ctrls.getContactById);

router.post("/", validateBody(contactsSchema), ctrls.addContact);

router.delete("/:contactId", ctrls.deleteContact);

router.put("/:contactId", validateBody(contactsSchema), ctrls.updateContact);

module.exports = router;

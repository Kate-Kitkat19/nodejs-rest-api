const { isValidObjectId } = require("mongoose");
const {HttpError} = require("../helpers");

function validateContactId(req, res, next) {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid!`));
  }
  next();
}

module.exports = validateContactId;

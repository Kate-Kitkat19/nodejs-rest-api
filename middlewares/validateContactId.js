const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers/HttpError");

function checkId(req, res, next) {
  const id = req.params.contactsId;
  if (isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid!`));
  }
}

module.exports = checkId;

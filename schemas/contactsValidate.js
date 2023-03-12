const Joi = require("joi");

const contactsSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string()
    .required()
    .min(3)
    .max(20)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required name field`;
            break;
          case "string.min":
            err.message = `Name should have at least ${err.local.limit} characters!`;
            break;
          case "string.max":
            err.message = `Name should have at most ${err.local.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  phone: Joi.string()
    .required()
    .min(8)
    .max(16)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required phone field`;
            break;
          case "string.min":
            err.message = `Phone number should have at least ${err.local.limit} characters!`;
            break;
          case "string.max":
            err.message = `Phone number should have at most ${err.local.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  email: Joi.string()
    .required()
    .email()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required email field`;
            break;
          case "string.email":
            err.message = `Value is not a valid e-mail`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

module.exports = contactsSchema;

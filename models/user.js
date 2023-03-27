const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: String,
    token: String,

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleError);

const signupSchema = Joi.object({
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
  password: Joi.string()
    .required()
    .min(5)
    .max(14)
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = `Missing required password field`;
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

const signinSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(5).max(14).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required().email(),
})

const User = model("user", userSchema);

module.exports = {
  signupSchema,
  signinSchema,
  emailSchema,
  userSchema,
  User,
};

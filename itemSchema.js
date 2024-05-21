import joi from "joi";

const itemSchema = joi.object({
  name: joi
    .string()
    .regex(/^(?!\s*$)[a-zA-Z\s]+$/)
    .min(1)
    .max(50)
    .required()
    .messages({
      "string.pattern.base": "Name should contain only alphabets.",
      "string.empty": "Name cannot be empty.",
      "string.max": "Name should not contain more than 50 characters.",
      "any.required": "Name is a required field.",
    }),
  gender: joi
    .string()
    .valid("male", "female", "m", "f")
    .insensitive()
    .required()
    .messages({
      "any.only": "Gender should be male, female, m or f.",
      "string.empty": "Gender cannot be empty.",
      "any.required": "Gender is a required field.",
    }),
  age: joi
    .string()
    .pattern(/^[0-9]+$/)
    .min(1)
    .max(3)
    .required()
    .messages({
      "string.pattern.base": "Age should contain only digits.",
      "string.empty": "Age cannot be empty.",
      "string.max": "Age should not contain more than 3 digits.",
      "any.required": "Age is a required field.",
    }),
  address: joi
    .string()
    .pattern(/^(?!\s*$).+/)
    .max(100)
    .required()
    .messages({
      "string.pattern.base": "Invalid address.",
      "string.empty": "Address cannot be empty.",
      "string.max": "Address should not contain more than 100 characters.",
      "any.required": "Address is a required field.",
    }),
  mobile: joi
    .string()
    .pattern(/^\+?[0-9]+(?:-[0-9]+){0,3}$/)
    .max(16)
    .required()
    .messages({
      "string.pattern.base": "Invalid mobile number.",
      "string.empty": "Mobile number cannot be empty.",
      "string.max": "Mobile number should not contain more than 16 characters.",
      "any.required": "Mobile number is a required field.",
    }),
});

export default itemSchema;

const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const schemaValidateToRegister = (obj) => {
  const schemaObj = joi.object({
    fName: joi.string().min(3).max(30).required(),
    lName: joi.string().min(3).max(30).required(),
    email: joi.string().min(3).max(30).required().email(),
    password: passwordComplexity().required(),
  });
  return schemaObj.validate(obj);
};
const schemaValidateToLogin = (obj) => {
  const schemaObj = joi.object({
    email: joi.string().min(3).max(30).required().email(),
    password: joi.string().min(8).max(30).required(),
  });
  return schemaObj.validate(obj);
};
const schemaValidateToUpdate = (obj) => {
  const schemaObj = joi.object({
    fName: joi.string().min(3).max(30),
    lName: joi.string().min(3).max(30),
    bio: joi.string().min(3),
    password: passwordComplexity().required(),
  });
  
  return schemaObj.validate(obj);
};

// validate email
const validateEmail = (obj) => {
  const schemaObj = joi.object({
    email: joi.string().min(3).max(30).required().email(),
  });
  return schemaObj.validate(obj);
};

// validate new password password
const validatePassword = (obj) => {
  const schemaObj = joi.object({
    password: passwordComplexity().required(),
  });
  return schemaObj.validate(obj);
};

module.exports = {
  schemaValidateToRegister,
  schemaValidateToLogin,
  schemaValidateToUpdate,
  validatePassword,
  validateEmail
};
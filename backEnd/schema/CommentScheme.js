const joi = require("joi");

const validateCreateComment = (opj) => {
  const schemaObj = joi.object({
    postId: joi.string().required().trim(),
    text: joi.string().required().trim().min(5),
  });
  return schemaObj.validate(opj);
};

const validateUpdateComment = (opj) => {
  const schemaObj = joi.object({
    text: joi.string().required().trim().min(5),
  });
  return schemaObj.validate(opj);
};

module.exports = {
  validateCreateComment, validateUpdateComment,
};

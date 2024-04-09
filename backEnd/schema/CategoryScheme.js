const joi=require("joi");
const schemaValidateToCategory = (obj) => {
  const schemaObj = joi.object({
    title: joi.string().trim().min(2).required(),
  });
  return schemaObj.validate(obj);
};


module.exports = {
  schemaValidateToCategory,
};
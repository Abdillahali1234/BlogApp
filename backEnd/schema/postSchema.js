const joi=require("joi");

const validateSchemaToPost=(obj)=>{

    const schemaObj = joi.object({
      title: joi.string().min(4).trim().required(),
      description: joi.string().min(10).trim().required(),
      category: joi.string().min(4).trim().required(),
    });
    return schemaObj.validate(obj);
    
}
const schemaToUpdatePost=(obj)=>{

    const schemaObj = joi.object({
      title: joi.string().min(4).max(200).trim(),
      description: joi.string().min(10).trim(),
      category: joi.string().min(4).trim(),
    });
    return schemaObj.validate(obj);
}

module.exports = { validateSchemaToPost, schemaToUpdatePost };
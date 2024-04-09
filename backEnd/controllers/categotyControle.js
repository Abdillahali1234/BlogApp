const { Category } = require("../model/Category.model");

const expressHandler = require("express-async-handler");
const { schemaValidateToCategory } = require("../schema/CategoryScheme");

/**------------------------------------------------------------------------------
 * @desc   create a new category
 * 
 * @router /api/categories
 * 
 * @method  POST 
 * 
 * @access private  (  only  admin ) 
 ----------------------------------------------------------------------------------*/

const createCategoryCtrl = expressHandler(async (req, res) => {
  const { error } = schemaValidateToCategory(req.body);

  if (error) {
    return res
      .status(400)
      .json({ status: "Fail", message: error.details[0].message });
  }

  const category = await Category.create({
    title: req.body.title,
    userId: req.user.id,
  });
  return res
    .status(201)
    .json({ status: "Success", message: { category: category } });
});

/**------------------------------------------------------------------------------
 * @desc   get all categories
 * 
 * @router /api/categories
 * 
 * @method  GET 
 * 
 * @access public  
 ----------------------------------------------------------------------------------*/
const getAllCategoryCtrl = expressHandler(async (req, res) => {
  const categories = await Category.find();
  return res.status(201).json({ status: "Success", data: categories });
});

/**------------------------------------------------------------------------------
 * @desc  delete  categories
 * 
 * @router /api/categories/:id
 * 
 * @method  DELETE 
 * 
 * @access private  (  only  admin ) 
 ----------------------------------------------------------------------------------*/

const deleteCategoryCtrl = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return res
      .status(404)
      .json({ status: "Fail", message: "category not found" });
  }

  const result = await Category.findByIdAndDelete(id, { new: true });
  return res.status(200).json({ status: "Success", data: result });
};

module.exports = {
  createCategoryCtrl,
  deleteCategoryCtrl,
  getAllCategoryCtrl,
};

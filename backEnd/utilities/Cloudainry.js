const cloudinary = require("cloudinary");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCloudinary = async (pathFileTOUpload) => {
  try {
    const image = await cloudinary.uploader.upload(pathFileTOUpload, {
      resource_type: "auto",
    });
    return image;
  } catch (error) {
    return error;
  }
};
const removeCloudinary = async (publicIdFileTORemove) => {
  try {
    const result = await cloudinary.uploader.destroy(publicIdFileTORemove, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    return error;
  }
};
const removeCloudinaryImages = async (publicIds) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { uploadCloudinary, removeCloudinary, removeCloudinaryImages };

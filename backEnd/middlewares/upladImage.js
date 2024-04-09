const multer = require("multer");
const path = require("path");

const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    
    if (file) {
      const uniqeName =
        new Date().toISOString().replace(/:/g, "-") + file.originalname;

      cb(null, uniqeName);
    } else {
      cb(null, false);
    }
  },
});



const uploadPhoto = multer({
  storage: photoStorage,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "unSupported file formate" }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 *20 },
});



module.exports = { uploadPhoto };
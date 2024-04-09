const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CLOUD_URI);
    console.log("connection established ^_^");
  } catch (error) {
    console.log("connection error: " + error);
  }
};


module.exports = connectDB;
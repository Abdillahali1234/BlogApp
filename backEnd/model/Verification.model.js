const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VerificationToken = mongoose.model("Verification", VerificationSchema);

module.exports = { VerificationToken };

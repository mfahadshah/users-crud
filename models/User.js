const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "basic"],
    },
    Address: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      country: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);

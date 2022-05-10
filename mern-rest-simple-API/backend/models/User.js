const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      trim: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)

const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "This filed is required ."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "This filed is required ."],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "{VALUE} is not valid",
    },
  },
  password: {
    type: String,
    required: false, // If login by oauth google
    minLength: 8,
  },
  googleId: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  id: { type: String },
})

module.exports = mongoose.model("User", userSchema)

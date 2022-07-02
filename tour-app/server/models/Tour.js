const mongoose = require("mongoose")

const tourSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: [true, "This filed is required ."],
    minlength: 5,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 5000,
    required: [true, "This filed is required ."],
  },
  name: {
    type: String,
    trim: true,
  },
  creator: {
    type: String,
    trim: true,
  },
  tags: {
    type: [String],
    required: true,
    trim: true,
  },
  imageFile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
})

module.exports = mongoose.model("Tour", tourSchema)

const mongoose = require("mongoose")

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "This field is required ."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Goal", goalSchema)

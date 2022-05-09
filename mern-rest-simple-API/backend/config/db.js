const mongoose = require("mongoose")
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.info(`Database connected : ${connect.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectDB

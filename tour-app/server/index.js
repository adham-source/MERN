if (process.env.NODE_ENV !== "production") require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(morgan("dev"))
app.use(cors()) //{origin: "*",}

app.use(express.json({ limit: "30mb", extended: true })) // {limit: "30mb", extended: true}
app.use(express.urlencoded({ limit: "30mb", extended: true })) // {limit: "30mb", extended: true}

app.use("/users", require("./routes/user"))
app.use("/tours", require("./routes/tour"))

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI

const main = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    app.listen(PORT, () => console.info(`Server running on port ${PORT}`))
    console.info(`${mongoose.connection.host}`)
  } catch (err) {
    console.error(`${err} cannot connected`)
  }
}

main()

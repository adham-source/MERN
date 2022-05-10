if (process.env.NODE_ENV !== "production") require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT || 8000
const { errorHandler } = require("./middlewares/errorHandler")

const connectDB = require("./config/db")()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/user"))
app.use("/api/goals", require("./routes/goal"))

app.use(errorHandler)

app.listen(PORT, () => console.info(`Server started on port ${PORT}`))

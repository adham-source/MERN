if (process.env.NODE_ENV !== "production") require("dotenv").config()
const path = require("path")
const express = require("express")
const cors = require("cors")
const PORT = process.env.PORT || 8000
const { errorHandler } = require("./middlewares/errorHandler")

const connectDB = require("./config/db")()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/user"))
app.use("/api/goals", require("./routes/goal"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.info(`Server started on port ${PORT}`))

const jwt = require("jsonwebtoken")
const User = require("../models/User")

const asyncHandler = require("express-async-handler")

const authToken = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decodedPayload.id).select({ password: 0 })
      next()
    } catch {
      res.status(401)
      throw new Error("Not authorized")
    }
  }
  if (!token) {
    res.status(401)
    throw new Error("Not authorize")
  }
})

module.exports = { authToken }

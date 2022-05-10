const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
/**
 * @description Register new user
 * @route       POST /api/users
 * @access      Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  //   if (!name)
  //     return res.status(400).json({ message: "Please add a name is required" })
  //   if (!email)
  //     return res.status(400).json({ message: "Please add an email is required" })
  //   if (!password)
  //     return res
  //       .status(400)
  //       .json({ message: "Please add a password is required" })
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  // Handle sycle of send password (forget password)
  // Not complate sycle
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (!user) {
    res.status(400)
    throw new Error("Invalid user data")
  }
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
})

/**
 * @description Authenticate a user
 * @route       POST /api/users/login
 * @access      Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error("Invalid credentials email")
  }
  const comparePassword = await bcrypt.compare(password, user.password)
  if (!comparePassword) {
    res.status(400)
    throw new Error("Invalid credentials password")
  }

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
})

/**
 * @description Get user data
 * @route       GET /api/users/me
 * @access      Private
 */
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id)
  res.json({ _id, name, email })
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

module.exports = { registerUser, authUser, getMe }

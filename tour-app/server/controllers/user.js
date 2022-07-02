const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

/**
 * @Description Create user into database
 * @Router      /users/register
 * @Access      Public
 */

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const userExist = await User.findOne({ email }).exec()

    if (userExist)
      return res.status(400).json({ message: "User already exists ." })

    const salt = bcrypt.genSaltSync(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    })

    if (!newUser) return res.status(400).json({ message: "Invalid user data" })

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id, name: newUser.name },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    )

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    })
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Login user
 * @Router      /users/login
 * @Access      Private
 */

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }).exec()
    if (!user)
      return res.status(400).json({
        message: "Please provide a valid email address and password .",
      })

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword)
      return res.status(400).json({
        message: "Please provide a valid email address and password .",
      })
    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    )
    if (!token || token === null)
      return res.status(403).json({ message: "unauthorization" })

    req.header = ("x-auth-token", token)
    res.json({ id: user._id, name: user.name, email: user.email, token })
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

const googleLogin = async (req, res) => {
  const { name, email, token, googleId, image } = req.body

  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.json({ id: user._id.toString(), email, name, token, image })
    }

    if (!token) return res.status(403).json({ message: "unauthorization" })

    req.header = ("x-auth-token", token)

    const newUser = await User.create({
      name,
      email,
      googleId,
      image,
    })

    res
      .status(201)
      .json({ id: newUser._id, name, email, googleId, image, token })
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Logout user
 * @Router      /users/logout
 * @Access      Private
 */
const logout = (req, res) => {
  req.logout()
  res.json({ message: "Log out succefully" })
}

module.exports = {
  register,
  login,
  googleLogin,
  logout,
}

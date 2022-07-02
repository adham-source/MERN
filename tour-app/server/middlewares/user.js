const {
  userRegisterValidate,
  userLoginValidate,
} = require("../validations/user")

const registerValidate = (req, res, next) => {
  const valid = userRegisterValidate(req.body)
  if (!valid)
    return res.status(400).json({ message: userRegisterValidate.errors })
  next()
}

const loginValidate = (req, res, next) => {
  const valid = userLoginValidate(req.body)
  if (!valid) return res.status(400).json({ message: userLoginValidate.errors })
  next()
}

module.exports = {
  registerValidate,
  loginValidate,
}

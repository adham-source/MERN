const express = require("express")
const { registerValidate, loginValidate } = require("../middlewares/user")
const { register, login, googleLogin, logout } = require("../controllers/user")

const router = express.Router()

router.post("/register", registerValidate, register)
router.post("/login", loginValidate, login)
router.post("/googleLogin", googleLogin)

router.post("/logout", logout)

module.exports = router

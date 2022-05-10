const express = require("express")
const { registerUser, authUser, getMe } = require("../controllers/user")
const { authToken } = require("../middlewares/auth")
const router = express.Router()

router.post("/", registerUser)
router.post("/login", authUser)
router.get("/me", authToken, getMe)

module.exports = router

const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"].split(" ")[1]
    // console.log(req.headers["x-auth-token"].split(" ")[1]) // access token by default req.headers.authorization
    if (!token) return res.status(401).json({ message: "Access denied .." })
    const isCustomAuth = token.length < 500
    let decodedData
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_TOKEN)
      req.userId = decodedData?.id
    } else {
      decodedData = jwt.decode(token)
      if (!decodedData || decodedData === null)
        return res.status(401).json({ message: "Access denied .." })
      const googleId = decodedData?.sub.toString() // sub ==> (sub: "googleid")
      const user = await User.findOne({ googleId })
      req.userId = user?._id
    }
    next()
  } catch (error) {
    res.status(403).json({ message: "Forbidden !" })
  }
}

module.exports = {
  auth,
}

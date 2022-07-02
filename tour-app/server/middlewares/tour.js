const { tourCreateValidate } = require("../validations/tour")

const tourCreateValidation = (req, res, next) => {
  const valid = tourCreateValidate(req.body)
  if (!valid)
    return res.status(400).json({ message: tourCreateValidate.errors })
  next()
}

module.exports = {
  tourCreateValidation,
}

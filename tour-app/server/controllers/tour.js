const { default: mongoose } = require("mongoose")
const Tour = require("../models/Tour")
const User = require("../models/User")

/**
 * @Description Get all tour from database
 * @Method      GET
 * @Router      /tours?page=number of page
 * @Access      Public
 */

const getTours = async (req, res) => {
  const { page } = req.query
  try {
    // const tours = await Tour.find({})
    // res.json(tours)
    const limit = 6
    const startIndex = (Number(page) - 1) * limit
    const total = await Tour.countDocuments({})
    const tours = await Tour.find().limit(limit).skip(startIndex).exec()
    res.json({
      tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    })
  } catch (error) {
    res.status(500).json({ message: "Some worning" })
  }
}

/**
 * @Description Get all tour from database by user search
 * @Method      GET
 * @Router      /tours/search?searchQuery=any title
 * @Access      Public
 */

const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query
  try {
    const title = new RegExp(searchQuery, "i")
    const tours = await Tour.find({ title }).exec()
    res.json(tours)
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Get tour from database
 * @Method      GET
 * @Router      /tours/:id
 * @Access      Public
 */

const getTour = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Not found tour !" })
    const tour = await Tour.findById(id).exec()
    if (!tour || tour == null)
      return res.status(404).json({ message: "Not founded tour !" })
    res.json(tour)
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Get all tours from database by tag
 * @Method      GET
 * @Router      /tours/tags/:tag
 * @Access      Public
 */

const getToursByTag = async (req, res) => {
  const { tag } = req.params
  try {
    const tours = await Tour.find({ tags: { $in: tag } }).exec()
    res.json(tours)
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Get related tour from database by tag
 * @Method      POST
 * @Router      /tours/related
 * @Access      Public
 */

const getRelatedTours = async (req, res) => {
  const tags = req.body
  try {
    const tours = await Tour.find({ tags: { $in: tags } }).exec()
    res.json(tours)
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Get all tour of user from database
 * @Method      GET
 * @Router      /tours/userTours/:userId
 * @Access      Private  -> after login user
 */

const getUserTours = async (req, res) => {
  const { userId } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).json({ message: "Not found User !" })
    const user = await User.findById(userId).exec()
    if (!user || user === null)
      return res.status(404).json({ message: "Not found this user !" })

    const userTours = await Tour.find({ user: userId, creator: userId }).exec()
    res.json(userTours)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Add like on tour then upadated into database
 * @Method      PATCH
 * @Router      /tours/like/:id
 * @Access      Private -> after login user
 */

const likeTour = async (req, res) => {
  const { id } = req.params
  try {
    if (!req.userId)
      return res.status(401).json({ message: "User is not authorized !" })
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Not found tour !" })

    const tour = await Tour.findById(id).exec()
    const index = tour.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) tour.likes.push(req.userId)
    if (index !== -1)
      tour.likes = tour.likes.filter((id) => id !== String(req.userId))

    const updateTour = await Tour.findByIdAndUpdate(id, tour, { new: true })

    res.json(updateTour)
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Create tour into database
 * @Method      POST
 * @Router      /tours
 * @Access      Private -> after login user
 */

const createTour = async (req, res) => {
  const { title, description, tags, imageFile } = req.body
  const newTour = new Tour({
    ...req.body,
    user: req.userId,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  })
  try {
    await newTour.save()
    res.status(201).json(newTour)
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Update tour into database
 * @Method      PATCH
 * @Router      /tours/:id
 * @Access      Private -> after login user
 */

const updateTour = async (req, res) => {
  const { id } = req.params
  const { title, description, tags, imageFile } = req.body

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Not found tour !" })

    const tour = await Tour.findById(id).exec()
    if (!tour || tour === null)
      return res.status(404).json({ message: "Not found tour !" })

    if (tour.user.toString() !== req.userId.toString())
      return res
        .status(401)
        .json({ message: "Unauthorized, cannot update this tour !" })

    const updatedTour = {
      title,
      description,
      tags,
      imageFile,
    }

    const tourUpdate = await Tour.findByIdAndUpdate(id, updatedTour, {
      new: true,
    })

    res.json(tourUpdate)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `${error.message}` })
  }
}

/**
 * @Description Delete tour from database
 * @Method      DELETE
 * @Router      /tours/:id
 * @Access      Private -> after login user
 */

const deleteTour = async (req, res) => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Not found tour !" })
    const tour = await Tour.findById(id).exec()
    if (!tour || tour === null)
      return res.status(404).json({ message: "Not found tour !" })

    if (tour.user.toString() !== req.userId.toString())
      return res
        .status(401)
        .json({ message: "Unauthorized, cannot delete this tour !" })

    await Tour.findByIdAndRemove(id)
    res.json({ message: "Tour deleted successfully ." })
  } catch (error) {
    res.status(500).json({ message: `${error.message}` })
  }
}

module.exports = {
  getTours,
  getToursBySearch,
  getTour,

  getToursByTag,
  getRelatedTours,

  getUserTours,
  likeTour,

  createTour,
  updateTour,
  deleteTour,
}

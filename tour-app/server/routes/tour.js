const express = require("express")
const router = express.Router()
const { tourCreateValidation } = require("../middlewares/tour")
const { auth } = require("../middlewares/auth")
const {
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
} = require("../controllers/tour")

router.get("/", getTours)
router.get("/search", getToursBySearch)

router.get("/:id", getTour)

router.get("/tags/:tag", getToursByTag)
router.post("/related", getRelatedTours)

router.get("/userTours/:userId", auth, getUserTours)
router.patch("/like/:id", auth, likeTour)

router.post("/", tourCreateValidation, auth, createTour)
// not work  tourCreateValidation,
router.patch("/:id", auth, updateTour)
router.delete("/:id", auth, deleteTour)

module.exports = router

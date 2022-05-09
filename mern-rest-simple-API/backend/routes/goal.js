const express = require("express")
const router = express.Router()
const {
  getGoals,
  setGoal,
  getGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goal")

router.route("/").get(getGoals).post(setGoal)
router.route("/:id").get(getGoal).delete(deleteGoal).put(updateGoal)

module.exports = router

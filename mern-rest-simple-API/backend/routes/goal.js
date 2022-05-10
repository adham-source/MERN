const express = require("express")
const router = express.Router()
const {
  getGoals,
  setGoal,
  getGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goal")

const { authToken } = require("../middlewares/auth")

router.route("/").get(authToken, getGoals).post(authToken, setGoal)
router
  .route("/:id")
  .get(authToken, getGoal)
  .delete(authToken, deleteGoal)
  .put(authToken, updateGoal)

module.exports = router

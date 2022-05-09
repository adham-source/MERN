const asyncHandler = require("express-async-handler")

const Goal = require("../models/Goal")

/**
 * @description Get Goals
 * @route       Get /api/goals
 * @access      Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find().sort({ createdAt: -1 }).exec()
  res.status(200).json(goals)
})

/**
 * @description Set Goal
 * @route       POST /api/goals
 * @access      Private
 */
const setGoal = asyncHandler(async (req, res) => {
  const { text } = req.body
  if (!text) {
    res.status(400)
    throw new Error("This field is required .")
  }

  const goal = await Goal.create({
    text,
  })
  res.status(201).json(goal)
})

/**
 * @description Get Goal
 * @route       Get /api/goals/:id
 * @access      Private
 */
const getGoal = asyncHandler(async (req, res) => {
  const { id } = req.params
  const goal = await Goal.findById(id)
  if (!goal) {
    res.status(404)
    throw new Error("Goal not found")
  }
  res.status(200).json(goal)
})

/**
 * @description Update Goal
 * @route       PUT /api/goals/:id
 * @access      Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { text } = req.body
  if (!text) {
    res.status(400)
    throw new Error("This field is required .")
  }

  const goal = await Goal.findById(id)
  if (!goal) {
    res.status(404)
    throw new Error("Goal not found")
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true })

  res.status(200).json(updatedGoal)
})

/**
 * @description Delete Goal
 * @route       DELETE /api/goals/:id
 * @access      Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params
  const goal = await Goal.findById(id)
  if (!goal) {
    res.status(404)
    throw new Error("Goal not found")
  }
  await Goal.findByIdAndDelete(id)
  // await goal.remove()
  res.status(200).json({ id })
})

module.exports = {
  getGoals,
  setGoal,
  getGoal,
  updateGoal,
  deleteGoal,
}

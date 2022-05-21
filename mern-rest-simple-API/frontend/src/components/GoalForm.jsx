import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
// import { toast } from "react-toastify"
import { createGoal } from "../features/goals/goalSlice"

const GoalForm = () => {
  const [text, setText] = useState("")

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    if (text === "" || !text || text === null || text === undefined)
      return toast.error("This field is required.")

    if (text.length < 5)
      return toast.error("Text is shorter than the minimum allowed length (5).")
    dispatch(createGoal({ text }))
    setText("")
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm

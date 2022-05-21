import { useDispatch } from "react-redux"
import { deleteGoal } from "../features/goals/goalSlice"
import { FaTrashAlt } from "react-icons/fa"
import moment from "moment"
import { toast } from "react-toastify"

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch()

  const handleDeleteGoal = (goalName) => {
    toast.warning(`${goalName} deleted`, {
      autoClose: 3000,
    })
    dispatch(deleteGoal(goal._id))
  }

  return (
    <div className="goal">
      <h3>{goal.text}</h3>
      <small>{moment(goal.createdAt).format("HH:MM:SS a")}</small>
      <br />
      <small>{moment(goal.createdAt).format(`YYYY-MMMM-D `)}</small>
      <span className="close" onClick={() => handleDeleteGoal(goal.text)}>
        <FaTrashAlt />
      </span>
    </div>
  )
}

export default GoalItem

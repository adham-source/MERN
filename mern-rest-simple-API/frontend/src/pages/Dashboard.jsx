import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getGoals, reset } from "../features/goals/goalSlice"
import GoalForm from "../components/GoalForm"
import GoalItem from "../components/GoalItem"
import Spinner from "../components/Spinner"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const { goals, isError, isLoading, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) toast.error(message)

    if (!user) navigate("/login")

    dispatch(getGoals())
    // return () => {
    //   dispatch(reset()) // Some problem when using logout
    // }
  }, [user, isError, message, dispatch, navigate]) // isError, message, navigate, dispatch , isError, dispatch, navigate

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <div className="heading">
        <h2>Goals Dashboard</h2>
        <h5>{user && `Welcome ${user.name}`}</h5>
      </div>

      <GoalForm />

      <section className="content">
        {!goals.length && <p style={{ textAlign: "center" }}>Not goal added</p>}
        {goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal} />
        ))}
      </section>
    </>
  )
}

export default Dashboard

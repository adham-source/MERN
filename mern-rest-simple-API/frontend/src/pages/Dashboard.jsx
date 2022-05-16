import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { reset } from "../features/auth/authSlice"
// import { toast } from "react-toastify"
// import Spinner from "../components/Spinner"

const Dashboard = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user, navigate])

  return (
    <>
      <h2>Dashboard</h2>
      <h5>{user ? `Welcome ${user.name}` : ""}</h5>
    </>
  )
}

export default Dashboard

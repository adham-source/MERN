import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { logout, reset } from "../features/auth/authSlice"
import { reset as resetGoal } from "../features/goals/goalSlice"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(resetGoal()) // This adde to reset goal = goals : []
    dispatch(logout())
    dispatch(reset())

    navigate("/login")
  }

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <Link to="/">Goals</Link>
          <ul>
            {user ? (
              <li>
                <button className="btn" onClick={onLogout}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <FaSignInAlt />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <FaUser />
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

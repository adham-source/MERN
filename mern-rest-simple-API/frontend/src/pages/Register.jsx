import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { name, email, password, confirmPassword } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) toast.error(message)

    if (isSuccess || user) navigate("/login")

    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (password !== confirmPassword)
      return toast.error("Passwords do not match")
    const userData = {
      name,
      email,
      password,
    }

    dispatch(register(userData))
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h2>
          <FaUser />
          Register
        </h2>
        <p>Please creat an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register

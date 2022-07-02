import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBInput,
  MDBSpinner,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { register } from "../features/auth/authSlice"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const Register = () => {
  const [formData, setFormData] = useState(initialState)
  const { firstName, lastName, email, password, confirmPassword } = formData

  const { isLoading, error } = useSelector((state) => ({ ...state.auth }))

  useEffect(() => {
    error &&
      toast.error(
        Array.isArray(error)
          ? `${error[0].instancePath
              .charAt(1)
              .toUpperCase()}${error[0].instancePath.slice(2)} ${
              error[0].message
            }`
          : error
      )
  }, [error])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword)
      return toast.error("Not matched password .")

    if (firstName && lastName && email && password && confirmPassword) {
      dispatch(register({ formData, navigate, toast }))
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <section
      style={{
        margin: "auto",
        padding: "1rem",
        maxWidth: "30rem",
        alignContent: "center",
        marginTop: "5rem",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-3x" />
        <h5 className="mt-2">Register</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              feedback="Please provide your first name."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={handleChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide your last name."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={handleChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide your email."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              invalid
              feedback="Please provide your password."
              className="col-md-12"
            >
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              invalid
              feedback="Please provide your confirm password."
              className="col-md-12"
            >
              <MDBInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                required
              />
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn type="submit" className="w-100 mt-2">
                {isLoading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Login</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </section>
  )
}

export default Register

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
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { GoogleLogin } from "react-google-login"
import { toast } from "react-toastify"
import { googleLogin, login } from "../features/auth/authSlice"

const initialState = {
  email: "",
  password: "",
}

const Login = () => {
  const [formData, setFormData] = useState(initialState)
  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === "" || password === "")
      return toast.error("This fields is required .")

    if (email && password) {
      dispatch(login({ formData, navigate, toast }))
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const googleSuccess = (response) => {
    const email = response?.profileObj?.email
    const name = response?.profileObj?.name
    const token = response?.tokenId
    const googleId = response?.googleId
    const image = response?.profileObj?.imageUrl

    const data = { email, name, token, googleId, image }
    dispatch(googleLogin({ data, navigate, toast }))
  }
  const googleFailure = (error) => {
    console.log(error)
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
        <h5 className="mt-2">Login</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>

          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <MDBBtn
                className="mt-3 w-100"
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" />
                Google login
              </MDBBtn>
            )}
            // buttonText="Login"
            onSuccess={googleSuccess} // googleSuccess
            onFailure={googleFailure} // googleFailure
            cookiePolicy={"single_host_origin"}
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Register</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </section>
  )
}

export default Login
